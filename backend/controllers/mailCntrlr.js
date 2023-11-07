const nodemailer = require("nodemailer");

const mailCntrlr = {
  sendmail: async (req, res) => {
    try {
      const { name, subject, mail, message } = req.body;

      const transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        post: 465,
        secure: true,
        auth: {
          user: "correodesdeweb@gmail.com",
          pass: "hbfqczpltnpxzret",
        },
      });

      await transporter.verify().then(() => {
        console.log("Ready for sending emails");
      });

      const mailOptions = {
        from: mail,
        to: "preciosbajos@gmail.com",
        subject: `Enviado desde página web - Asunto: ${subject}`,
        html: `
                <div style=
                "border: solid 2px #25275e; 
                padding: 5em; 
                margin: auto; 
                border-radius: 15px;" > 

                <b><h1 style="color:#25275e">Correo:</h1></b><a href=mailto:${mail}?subject=${subject}><h2 style="color: #eb3e20" >${mail}</h2></a> 
                <br><b><h1 style="color:#25275e" >Nombre:</h1></b> <h2 style="color: #eb3e20" >${name}</h2> 
                <br><b><h1 style="color:#25275e">Mensaje:</h1></b> <p style="margin:auto; font-size: 2em;">${message}</p>
                <br><br> <img src=https://res.cloudinary.com/dhbvri4ni/image/upload/v1679334669/planeta-precios-bajos-e-commerce/Sucursal/Logo-icon_nidcrq.png style="display:flex; justify-content: center; align-items: center; margin: auto" > <br><p style="color: #eb3e20;  margin-left: auto;">Mensaje enviado desde la página web.</p>
                
                
                </div>
               `,
        text: message,
      };

      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          console.log("E-mail enviado! ");
          res.status(200).json(req.body);
        }
      });

      res.json({
        msg: "E-mail enviado! Agradecemos que te comuniques con nosotros. Estaremos contactando contigo en la brevedad.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = mailCntrlr;
