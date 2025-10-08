import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.confic.js";

export const sendVerificationEmail= async(email, verificationToken) => {
    const recipient = [{ email }]; //recipient email address

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject :"Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category:"Email verification"
        }) 
        console.log("Email send successfully", response);
        
    } catch (error) {
        console.log('Error sending varification', error);

        throw new Error(`Error sending varificaion email :${error}`);
        
        
    }
}

export const sendWelcomeEmail = async(email, name) => {
    const recipient = [{ email }]; //recipient email address

    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            template_uuid:"5f356a9d-e93f-40bc-a4ea-059edf81cb9a",
             template_variables: {
                    company_info_name: "Authantication App",
                    name: name,
        },
    }); 
        console.log("Welcome Email send successfully", response);
    } catch (error) {
        console.error('Error sending welcome email', error);
        
        throw new Error(`Error sending welcome email :${error}`);
    }
}

export const sendResetPasswordEmail= async(email, resetURL) => {
    const recipient = [{ email }]; //recipient email address

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject :"Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category:"Password reset"
        })
    } catch (error) {
        console.error('Error sending reset password email', error);
        
        throw new Error(`Error sending reset password email :${error}`);
       }      
    }

export const sendResetSuccessEmail = async(email) => {
    const recipient =[{ email }]; //recipient email address

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject :"Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password reset"
        })
    } catch (error) {
        console.error('Error sending reset password email', error);

        throw new Error(`Error sending reset password email :${error}`); 
    }
};
