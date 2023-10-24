<template>
    <div>
        <a target="_blank" href="/docx/tag-example.docx">下载模板文件tag-example.docx</a>
        <button @click="downloadDoc">下载生成之后的文件</button>
    </div>
</template>

<script>
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
// import PizZipUtils from "pizzip/utils/index.js";
import {saveAs} from "file-saver";
import ImageModule from 'docxtemplater-image-module-free'

export default {
    name: "render-docx",
    data() {
        return {
            PizZipUtils: null,
            imageOptions: {}
        }
    },
    mounted() {
        import('pizzip/utils/index.js').then(module => {
            this.PizZipUtils = module.default
            console.log(this.PizZipUtils)
            this.imageOptions = {
                centered: false,
                getImage(url) {
                    return new Promise((resolve, reject) => {
                        module.default.getBinaryContent(
                            url,
                            function (error, content) {
                                if (error) {
                                    return reject(error);
                                }
                                return resolve(content);
                            }
                        );
                    });
                },
                getSize(img, url, tagName) {
                    return new Promise((resolve, reject) => {
                        const image = new Image();
                        image.src = url;
                        image.onload = function () {
                            switch (tagName) {
                                // img
                                case 'img':
                                    resolve([100, 100 * image.height / image.width]);
                                    break;
                                default:
                                    resolve([image.width, image.height]);
                            }
                        };
                        image.onerror = function (e) {
                            console.log(
                                "img, url, tagName : ",
                                img,
                                url,
                                tagName
                            );
                            alert(
                                "An error occured while loading " +
                                url
                            );
                            reject(e);
                        };
                    });
                },
            }
        })
    },
    methods: {
        downloadDoc() {
            const data = {
                last_name: '小',
                first_name: '明',
                img: '/images/qrcode-alipay.png'
            }
            this.renderDoc({
                data
            })
        },
        loadFile(url, callback) {
            this.PizZipUtils.getBinaryContent(url, callback);
        },


        /**
         * 生成doc文档
         * @param templateUrl 文档模板
         * @param data 模板中的数据
         * @param fileName 导出的文件名称
         */
        renderDoc({templateUrl = '/docx/tag-example.docx', data, fileName = 'output'}) {
            let url = templateUrl

            this.loadFile(url, (
                error,
                content
            ) => {
                if (error) {
                    throw error;
                }
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                    modules: [new ImageModule(this.imageOptions)]
                });

                try {
                    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                    // doc.render();
                    doc.renderAsync(data).then(() => {
                        const out = doc.getZip().generate({
                            type: "blob",
                            mimeType:
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        });
                        // Output the document using Data-URI
                        saveAs(out, `${fileName}.docx`);
                    });
                } catch (error) {
                    // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                    function replaceErrors(key, value) {
                        if (value instanceof Error) {
                            return Object.getOwnPropertyNames(value).reduce(function (
                                    error,
                                    key
                                ) {
                                    error[key] = value[key];
                                    return error;
                                },
                                {});
                        }
                        return value;
                    }

                    console.log(JSON.stringify({error: error}, replaceErrors));

                    if (error.properties && error.properties.errors instanceof Array) {
                        const errorMessages = error.properties.errors
                            .map(function (error) {
                                return error.properties.explanation;
                            })
                            .join("\n");
                        console.log("errorMessages", errorMessages);
                        // errorMessages is a humanly readable message looking like this :
                        // 'The tag beginning with "foobar" is unopened'
                    }
                    throw error;
                }

            });
        }

    }
}
</script>

<style lang="scss" scoped>

</style>
