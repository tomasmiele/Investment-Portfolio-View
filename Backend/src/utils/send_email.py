import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, To, From, Content

def send_email(email: str, content: str, subject: str = "No subject"):
    api_key = os.environ.get("SENDGRID_API_KEY")

    sendgrid_client = SendGridAPIClient(api_key)

    message = Mail(
        from_email=From(email="administrativo@insperjr.com", name="Onboarding"),
        to_emails=[To(email=email)],
        subject=subject,
        html_content=content  
    )

    sendgrid_client.send(message)
