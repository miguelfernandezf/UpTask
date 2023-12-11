import nodemailer from 'nodemailer'

export const emailRegistro = async (datos)=>{
    const {nombre, email, token} = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Confirma tu cuenta",
        text: "Comprueba tu cuenta en Uptask",
        html: `<p>Hola ${nombre} confirma tu cuenta en UpTask</p>
            <p> Tu cuenta ya esta casi lista, solo debes confirmarla en el siguiente enlace:

            <a href='${process.env.FRONTEND_URL}/confirmar/${token}'>Comprobar cuenta</a>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })
}

export const emailOlvidePassword = async (datos)=>{
    const {nombre, email, token} = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Reestablece tu password",
        text: "Comprueba tu cuenta en Uptask",
        html: `<p>Hola ${nombre} has solicitado reestablecer tu password</p>
            <p> Sigue el siguiente enlace para generar un nuevo password:

            <a href='${process.env.FRONTEND_URL}/olvide-password/${token}'>Reestablecer Password</a>

            <p>Si tu no solicitaste un cambio de contraseña, puedes ignorar este mensaje</p>
        `
    })
}
