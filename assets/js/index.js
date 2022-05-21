$(function () {
    getUserInfo()
    const layer = layui.layer
    $('#btnLogout').click(function () {
        layer.confirm('确认退出登录', { icon: 3, title: '提示' }, function () {
            localStorage.removeItem('token')
            location.href = '/login.html'
        });
    })
})
const layer = layui.layer
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        //! 请求头
        // headers: {
        //     Authorization:localStorage.getItem('token')
        // },
        success: (res) => {
            if (res.status !== 0) return layer.msg('获取用户信息失败');
            layer.msg('获取用户信息成功')
            renderAvatar(res.data)
        },
        
    })
}
const renderAvatar = (user) => {
    let name = user.nickname || user.username
    $('#welcome').html(`欢迎 ${name}`)
    if (user.user_pic !== null) {
        $('.layui-nav-img').sttr('src', user_pic).show();
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        let firstName = name[0].toUpperCase()
        $('.text-avatar').html(firstName).show()
    }
}