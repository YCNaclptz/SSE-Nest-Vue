<template>
    <div>
        <iframe ref="ifrm" class="editor" sandbox="allow-same-origin" @input="updateIframe"></iframe>
        <div>{{ iframeContent }}</div>
    </div>
</template>

<script>

    export default {
    data() {
        return {
            iframeContent: `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <title>Inner</title>
                            </head>
                            <body contenteditable="true">
                            </body>
                            </html>`
        };
    },
    methods: {
        updateIframe() {
            let frameDoc = this.$refs.ifrm.contentDocument || this.$refs.ifrm.contentWindow.document;
            console.log(frameDoc.documentElement)
            this.iframeContent = frameDoc.documentElement.outerHTML;
        },
        loadIframe(){
            let frameDoc = this.$refs.ifrm.contentDocument || this.$refs.ifrm.contentWindow.document;
            frameDoc.open();
            frameDoc.write(this.iframeContent);
            frameDoc.close();
        }
    },
    mounted() {
        // 獲取模板內容並設置到iframeContent數據中
        this.loadIframe();
    }
    }
    
</script>
<style scoped>
    .editor{
        width: 100%;
        height: 100%;
        border: 1px solid black;
    }
</style>