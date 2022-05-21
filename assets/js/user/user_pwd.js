$(function () {
    const form = layui.form
    const layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        samePwd: (val) => {
            if (val === $('[name=oldPwd]').val()) return '新旧密码不能相同'
        },
        rePwd: (val) => {
            if (val !== $('[name=newPwd]').val()) return '两次密码不一致'
        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0)  return layer.msg('修改密码失败！')
                layer.msg('修改密码成功！')
                // 清空本地存储
                localStorage.removeItem('token')
                // 返回登录页
                window.parent.location.href = '/login.html'
            }
        })
    })
})