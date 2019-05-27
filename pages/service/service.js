Component({
    properties: {
        right: {
            type: String,
            value: "0"
        },
        bottom: {
            type: String,
            value: "10"
        },
        content: {
            type: String,
            value: "看这里～，有你想要的"
        },
        width: {
            type: String,
            value: "200"
        },
        image: {
            type: String,
            value: "https://wsgroup.hmset.com/images/wjtq/other/5a40964193.jpg"
        }
    },
    data: {},
    methods: {
        cusomterSerive: function() {
            console.log(123);
        }
    }
});