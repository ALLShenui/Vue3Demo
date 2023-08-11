<template>
    <div>
        <div>{{test}}</div>
        <router-link to="/secondPage">Go to Second</router-link>
    </div>
</template>
<script>
import {ref,defineComponent} from 'vue'
export default defineComponent({
    props: {
        number: {
            type: Number,
            default: 1,
        },
        max: {
            type: Number,
            default: 100,
        },
        min: {
            type: Number,
            default: 1,
        }
    },
    setup(props) {
        const test = ref("test")
        return{
            test
        }
    }
})
</script>