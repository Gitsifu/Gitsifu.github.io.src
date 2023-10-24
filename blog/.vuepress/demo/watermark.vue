<template>
    <div>
        <div class="flex">
            <div class="item">
                <img :src="options.url"/>
                <div style="text-align: center;">加水印前</div>
            </div>
            <div class="item">
                <img :src="watermarkImg"/>
                <div style="text-align: center;">加水印后</div>
            </div>
        </div>
        <el-form :inline="true">
            <el-form-item label="水印文案">
                <el-input v-model="options.watermarkText"/>
            </el-form-item>
            <el-form-item label="文字大小">
                <el-input-number v-model.number="options.fontSize" type="number"/>
            </el-form-item>
            <el-form-item label="水印颜色">
                <el-color-picker v-model="options.textColor" :show-alpha="true"></el-color-picker>
            </el-form-item>
            <el-form-item label="水印旋转角度">
                <el-input-number v-model.number="options.angle" type="number"/>
            </el-form-item>
            <el-form-item label="水印模式">
                <el-select v-model="options.mode">
                    <el-option value="interval">interval</el-option>
                    <el-option value="repeat">repeat</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="平铺块的大小">
                <el-input-number v-model.number="options.tileSize" type="number"/>
            </el-form-item>
            <el-form-item label="水印之间的间距">
                <el-input-number v-model.number="options.padding" type="number"/>
            </el-form-item>
            <el-form-item label="图片旋转角度">
                <el-input-number v-model.number="options.rotateAngle" type="number"/>
            </el-form-item>
            <el-form-item label="生成的图片类型">
                <el-select v-model="options.type">
                    <el-option value="image/png">image/png</el-option>
                    <el-option value="image/jpeg">image/jpeg</el-option>
                    <el-option value="image/webp">image/webp</el-option>
                </el-select>
                <span style="font-size: 12px;color: #bb2d3b;">注意图片旋转后，jpeg格式不支持背景透明</span>
            </el-form-item>
            <el-form-item label="图片品质，取值0-1">
                <el-input-number v-model.number="options.quality" :min="0" :max="1" :step="0.1" type="number"/>
                <span style="font-size: 12px;color: #bb2d3b;">对于 JPEG 和 WebP 格式的图像，该参数表示图像的质量级别，范围为 0 到 1。对于 PNG 格式的图像，该参数被忽略</span>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: "watermark",
    components: {},
    data() {
        return {
            watermarkImg: '',
            options: {
                url: '/images/watermark.jpg',
                watermarkText: 'LOVE',
                angle: -30, // 水印旋转角度，负数表示逆时针旋转
                fontSize: 30, //水印文字的大小（以像素为单位）
                textColor: "#503CE2A8", // 水印颜色
                mode: 'interval', // 可选值 'repeat' 重复展示
                tileSize: 200,  // 平铺块的大小
                padding: 10,   // 水印之间的间距
                rotateAngle: 0, // 图片旋转角度，默认为0度，负数为逆时针旋转
                quality: 1, // 图片品质，取值0-1，值越大，生成的图片越大
                type: 'image/png', // 生成的图片类型
            },
        }
    },
    mounted() {
        this.renderImg()
    },
    watch: {
        options: {
            handler() {
                this.renderImg()
            },
            deep: true
        },
    },
    methods: {
        // 渲染水印图片
        renderImg() {
            this.getWatermarkImg({
                ...this.options
            }).then(res => {
                const {base64} = res
                this.watermarkImg = base64
            })
        },
        /**
         * 为图片添加水印
         * @param url 原始图片url
         * @param watermarkText 水印文案
         * @param angle 水印旋转角度
         * @param fontSize 水印字体大小
         * @param textColor 水印颜色，支持rgba或者16进制颜色值
         * @param mode 水印渲染模式，默认 interval 错行渲染。可选值 repeat 重复渲染
         * @param tileSize 平铺块的大小
         * @param padding 水印之间的间距
         * @param rotateAngle 图片旋转角度 负数为逆时针旋转
         * @param quality 图片品质，参数是一个可选的数值，用于指定图像质量。对于 JPEG 和 WebP 格式的图像，该参数表示图像的质量级别，范围为 0 到 1。对于 PNG 格式的图像，该参数被忽略
         * @param type 生成的图片类型，默认: 'image/png'
         * @returns {Promise<unknown>}
         */
        getWatermarkImg(
            {
                url,
                watermarkText = '测试水印',
                angle = -30, // 水印旋转角度，负数表示逆时针旋转
                fontSize = 14, //水印文字的大小（以像素为单位）
                textColor = "rgba(0, 0, 0, 0.4)",
                mode = 'interval', // 可选值 'repeat' 重复展示
                tileSize = 200,  // 平铺块的大小
                padding = 10,   // 水印之间的间距
                rotateAngle = 0, // 图片旋转角度，默认为0度，负数为逆时针旋转
                quality = 0.5, // 图片品质，参数是一个可选的数值，用于指定图像质量。对于 JPEG 和 WebP 格式的图像，该参数表示图像的质量级别，范围为 0 到 1。对于 PNG 格式的图像，该参数被忽略
                type = 'image/png', // 生成的图片类型，默认: 'image/png'
            }
        ) {
            return new Promise(async (resolve, reject) => {
                // 如果图片需要旋转
                if (rotateAngle !== 0) {
                    // 将图片旋转指定角度
                    try {
                        const value = await this.rotateImage({url, angle: rotateAngle})
                        url = value.base64
                    } catch (e) {
                        reject(e)
                    }
                }
                // 加载图片
                const image = new Image();
                image.src = url;
                image.onerror = () => {
                    reject('获取图片失败')
                }
                image.onload = () => {
                    // 创建 Canvas 元素并获取上下文
                    let canvas = document.createElement('canvas');
                    let context = canvas.getContext('2d');

                    // 设置 Canvas 的宽度和高度，需要和图片一致
                    canvas.width = image.width;
                    canvas.height = image.height;

                    // 将图片绘制到 Canvas 上
                    context.drawImage(image, 0, 0);

                    // 计算旋转后 Canvas 的中心点坐标
                    let centerX = canvas.width / 2;
                    let centerY = canvas.height / 2;

                    // 设置旋转变换矩阵
                    context.translate(centerX, centerY);  // 先将原点移到 Canvas 中心
                    context.rotate(angle * Math.PI / 180);  // 以 Canvas 中心为轴心进行旋转
                    context.translate(-centerX, -centerY);  // 将原点移回到左上角

                    // 设置文字样式
                    context.font = fontSize + 'px Arial';  // 字体样式和大小

                    // 绘制重复水印
                    if (mode === 'repeat') {
                        // 循环绘制水印
                        for (let x = 0; x < canvas.width; x += tileSize + padding) {
                            for (let y = 0; y < canvas.height; y += tileSize + padding) {
                                context.fillStyle = textColor;
                                context.fillText(watermarkText, x, y);  // 绘制水印文本
                            }
                        }
                    } else {
                        // 循环绘制错行水印
                        for (let x = 0; x < canvas.width; x += tileSize + padding) {
                            for (let y = 0; y < canvas.height; y += tileSize + padding) {
                                context.fillStyle = textColor;

                                // 根据所在行数计算垂直偏移量
                                let lineOffset = (x / (tileSize + padding)) % 2 === 0 ? 0 : (tileSize + padding) / 2;

                                // 根据所在行数判断是否错行绘制水印文本
                                if ((x / (tileSize + padding)) % 2 === 0) {
                                    context.fillText(watermarkText, x, y + lineOffset);  // 绘制水印文本
                                } else {
                                    context.fillText(watermarkText, x, y - lineOffset + tileSize);  // 绘制水印文本
                                }
                            }
                        }
                    }

                    try {
                        // 将带有水印的图片转换为 Base64 格式
                        const watermarkedImageSrc = canvas.toDataURL(type, quality);
                        resolve({
                            base64: watermarkedImageSrc
                        })
                    } catch (e) {
                        reject(e)
                    }
                };
            })
        },


        /**
         * 旋转图片
         * @param url 图片url
         * @param angle 图片旋转的角度，负数为逆时针旋转
         * @param type 生成的图片类型，默认: 'image/png'
         * @returns {Promise<unknown>}
         */
        rotateImage(
            {
                url,
                angle = 0,
                type = 'image/png'
            }
        ) {
            return new Promise((resolve, reject) => {
                // 创建一个 Image 对象
                const image = new Image();
                image.src = url

                // 设置当图片加载完成后的回调函数
                image.onload = function () {
                    // 创建一个 Canvas 元素
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    // 计算旋转后的画布尺寸
                    const width = image.width;
                    const height = image.height;
                    const radians = angle * Math.PI / 180;
                    const rotatedWidth = Math.abs(width * Math.cos(radians)) + Math.abs(height * Math.sin(radians));
                    const rotatedHeight = Math.abs(width * Math.sin(radians)) + Math.abs(height * Math.cos(radians));

                    // 设置画布尺寸
                    canvas.width = rotatedWidth;
                    canvas.height = rotatedHeight;

                    // 平移到画布中心并旋转
                    context.translate(rotatedWidth / 2, rotatedHeight / 2);
                    context.rotate(radians);

                    // 绘制旋转后的图像
                    context.drawImage(image, -width / 2, -height / 2, width, height);

                    // 将旋转后的图像转换为base64
                    const rotatedImageSrc = canvas.toDataURL(type);

                    resolve({
                        base64: rotatedImageSrc
                    })
                };

                // 设置当图片加载失败后的回调函数
                image.onerror = function () {
                    reject('无法加载图片');
                };
            });
        }
    }
}
</script>

<style lang="scss" scoped>
form label {
    margin-bottom: 10px;
    margin-right: 15px;
}

.flex {
    display: flex;

    .item {
        flex: 1;
        padding: 10px;
    }
}
</style>
