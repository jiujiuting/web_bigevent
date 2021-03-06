$(function () {
    const layer = layui.layer
    const form = layui.form
    const laypage = layui.laypage

    //? 定义一个查询的参数对象，将来请求数据的时候，
    //? 需要将请求参数对象提交到服务器
    //! 定义参数
    const q = {
        pagenum: 1,  //? 页码值，默认请求第一页的数据
        pagesize: 2, //? 每页显示几条数据，默认每页显示2条
        cate_id: "", //? 文章分类的 Id
        state: "",   //? 文章的发布状态
    };
    //! 获取文章列表
    const initTable = () => {
        $.ajax({
            type: "GET",
            url: '/my/article/list',
            data: q,
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取文章列表失败！')
                layer.msg('获取文章列表成功！')
                const htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    initTable()
    //! 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    //! 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    //! 获取分类
    const initCate = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取分类数据失败！')
                const htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render('select')
            }
        })
    }
    initCate()
    //! 筛选功能
    $('#form-search').on('submit', (e) => {
        e.preventDefault();
        const jiujiu = $('[name=cate_id]').val()
        const aiwo = $('[name=stated]').val()
        q.cate_id = jiujiu;
        q.state = aiwo;
        initTable()
    })
    //! 定义分页
    const renderPage = (total) => {
        //? 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox',   //? 分页容器的 Id
            count: total,      //? 总数据条数
            limit: q.pagesize, //? 每页显示几条数据
            curr: q.pagenum,   //? 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],//? 每页展示多少条
            //? 切换
            jump: (obj, first) => {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }
    //! 删除功能 
    $('tbody').on('click', '.btn-delete', function () {
        const id = $(this).attr('data-id')
        const len = $('.btn-delete').length
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/delete/' + id,
                success: (res) => {
                    if (res.status !== 0) return layer.msg('删除文章失败！')
                    layer.msg('删除文章成功！')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
            form.close(index)
        })
    })

})