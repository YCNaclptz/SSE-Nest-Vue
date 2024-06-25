<template>
    <div class="sse-control-container">
        <div>
            <textarea id="prompt" v-model="prompt"> </textarea>
        </div>

        <div>
            <textarea id="response" v-model="joinedMessages" disabled></textarea>
        </div>
        <div class="toolbar">
            <select v-model="selectedApi">
                <option v-for="api in apis" :key="api.name" :value="api.url">{{ api.name }}</option>
            </select>
            <button id="send" v-show="!sending" @click="connect">傳送</button>
            <button id="stop" v-show="sending" @click="cancel">取消</button>
        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            messages: [],
            prompt: '',
            selectedApi: '',
            apis: [
                { name: 'slow', url: `${import.meta.env.VITE_nest_host}/api/event` },
                { name: 'fast', url: 'https://localhost:44367/chat.ashx' },
                { name: 'chatgpt', url: `${import.meta.env.VITE_nest_host}/chatgpt` },
            ],
            eventSource: null,
            sending: false
        };
    },
    methods: {
        connect() {
            const stopSignal = 'undefined';
            if (this.eventSource) {
                this.cancel();
            }
            this.eventSource = new EventSource(`${this.selectedApi}/?prompt=${this.prompt}`);
            this.eventSource.onopen = () => {
                this.sending = true;
            }
            this.eventSource.onmessage = ({ data }) => {
                console.log(data);
                if (data === stopSignal) {
                    this.cancel();
                }
                else{
                    this.messages.push(data);
                }
                
            };

        },
        cancel(){
            this.eventSource.close();
            this.sending = false;
        }
    },
    computed: {
        joinedMessages() {
            return this.messages.join('');
        }
    },
    created() {
        // 在元件創建時，設定 selectedApi 為 apis 陣列的第一個元素的 url
        this.selectedApi = this.apis[0].url;
    },
    beforeDestroy() {
        if (this.eventSource) {
            this.eventSource.close();
        }
    }
};
</script>
    
<style scoped>
    .sse-control-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 80vh;
    }
    .sse-control-container div:nth-of-type(1),
    .sse-control-container div:nth-of-type(2){
        flex-grow: 1;
    }
    input, textarea{
        width: 80%;
    }
    #prompt {
        resize: none;
        height: 90%;
    }
    #response {
        height: 90%;
        resize: none;
        
    }
    .toolbar{
        display: flex;
        gap: 4px;
        justify-content: end;
    }
    button:hover{
        cursor: pointer;
    }

</style>
