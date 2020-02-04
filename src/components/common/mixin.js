import BackTop from 'components/content/BackTop';

export const backTopMixin = {
    data(){
        return{
            isShowBackTop: false,
        }
    },
    components:{
        BackTop,
    },
    methods:{
        backClick(){
            this.$refs.detailScroll.scroll.scrollTo(0, 0, 300);
        },
        listenShowBackTop(position){
            this.isShowBackTop = -position.y > 1000;
        }
    }

}