<template>
    <div>
        <div>
            <textarea id="prompt" v-model="prompt"> </textarea>
        </div>
        <select v-model="selectedApi">
            <option v-for="api in apis" :key="api.name" :value="api.url">{{ api.name }}</option>
        </select>
        <button @click="connect">連接</button>
        <div>
            <textarea v-model="joinedMessages"></textarea>
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
                { name: '1', url: `${import.meta.env.VITE_nest_host}/api/event` },
                { name: '2', url: `${import.meta.env.VITE_nest_host}/chatgpt` },
                { name: '3', url: 'https://localhost:44367/chat.ashx' }
            ],
            eventSource: null,
        };
    },
    methods: {
        connect() {
            const privateAreaChar = 'undefined';
            if (this.eventSource) {
                this.eventSource.close();
            }
            this.eventSource = new EventSource(`${this.selectedApi}/?prompt=${this.prompt}`);
            this.eventSource.onmessage = ({ data }) => {
                if (data === privateAreaChar) {
                    this.eventSource.close();
                }
                else{
                    this.messages.push(data);
                }
                
            };

        }
    },
    computed: {
        joinedMessages() {
            return this.messages.join('');
        }
    },
    created() {
        // 在元件創建時，設定 selectedApi 為 apis 陣列的第一個元素的 url
        this.selectedApi = this.apis[1].url;
    },
    beforeDestroy() {
        if (this.eventSource) {
            this.eventSource.close();
        }
    }
};
</script>
    
<style scoped>
    #prompt {
        width: 100%;
        height: 5rem;
        resize: none;
    }
</style>
