export const VerificationEmailTemplate = (name: string, code: string) => `

<div style="background-color: #f4f4f4; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #e2e2e2; border-radius: 32px; overflow: hidden; text-align: center;">
    <tr>
      <td style="padding: 40px 20px;">
        
        <div style="margin-bottom: 20px;">
          <img src="https://raw.githubusercontent.com/Edu509505/images/f2ade11bc990ff7edf362342d9ff14c31c53354d/logo.png" alt="Logo" width="100" style="display: block; margin: 0 auto; border: 0;" />
          <h1 style="margin: 10px 0 0 0; color: #1a1a1a; font-size: 28px;">Horizon Log</h1>
        </div> 

        <h2>Olá</h2>
        <h2>${name}</h2>

        <h2 style="color: #333; margin-bottom: 30px;">Confirmação de E-mail</h2>

        <table align="center" border="0" cellpadding="0" cellspacing="0" width="85%" style="background-color: rgb(64, 51, 235); border-radius: 32px;">
          <tr>
            <td style="padding: 30px 10px;">
              <h1 style="font-size: 64px; color: white; margin: 0; letter-spacing: 5px;">
                ${code}
              </h1>
              <h4 style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-weight: normal; font-size: 16px;">
                Código com validade de 15 minutos
              </h4>
            </td>
          </tr>
        </table>

        <h3 style="color: #666; font-size: 16px; margin-top: 30px; font-weight: normal;">
          Não compartilhe esse código com ninguém.
        </h3>

      </td>
    </tr>
  </table>
</div>
`;
