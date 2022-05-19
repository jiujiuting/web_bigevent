$(function () {
    // 点击去注册账号让 登录框隐藏，注册框显示
    $("#link_reg").click(() => {
      $(".login-box").hide();
      $(".reg-box").show();
    });
    // 点击去登录让 注册框隐藏，登录框显示
    $("#link_login").click(() => {
      $(".login-box").show();
      $(".reg-box").hide();
    });
    const form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repwd: (val)=> {
            const pwd = $('.reg-box [name=password]').val();
            if (val !== pwd) return '两次密码不一致'
        }
    })
    const layer = layui.layer
    $('#form_reg').on('submit', (e) => {
      e.preventDefault()
      $.ajax({
        type:'POST',
        url: '/api/reguser',
        data: {
          username: $('#form_reg [name=username]').val(),
          password: $('#form_reg [name=password]').val(),
        },
        success: (res) => {
          if (res.status !== 0) return layer.msg('注册失败！' + res.message)
          layer.msg('注册成功！')
          $('#link_login').click()
        }
      })
    })
    $('#form_login').on('submit', function (e) {
      e.preventDefault()
      $.ajax({
        type:'POST',
        url: '/api/login',
        data: $(this).serialize(),
        success: (res) => {
          console.log(res);
          if (res.status !== 0) return layer.msg('登录失败！')
          layer.msg('登录成功！')
          localStorage.setItem('token', res.token)
          location.href = '/index.html'
        }
      }) 
    })
  })