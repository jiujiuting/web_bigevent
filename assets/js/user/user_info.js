
const form = layui.form
const layer = layui.layer
form.verify({
    nickname: (val) => {
        if (val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！'
    }
})
const initUserinfo = () => {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: (res) => {
            if (res.status !== 0) return layer.msg('获取用户信息失败！')
            layer.msg('获取用户信息成功！')
            form.val('formUserInfo', res.data)
        }
    })
}
$('#Reset').click((e) => {
    e.preventDefault()
    initUserinfo()
})
$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url:'/my/userinfo',
        data: $(this).serialize(),
        success: (res) => {
            if (res.status !== 0) return layer.msg('更改用户信息失败！')
            layer.msg('更改用户信息成功！')
            window.parent.getUserInfo()
        }
    })
});
initUserinfo()