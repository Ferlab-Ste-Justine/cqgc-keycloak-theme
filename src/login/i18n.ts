/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            activation_title: "Access request",
            activation_text:
                "To obtain access to the high-throughput clinical sequencing platform of the Quebec Center for Clinical Genomics, please contact René Allard at the contact information below:",
            login_title: "Analyses and Diagnostics",
            login_title_prescription: "Prescriptions and Requisitions",
            login_options: "Log in with",
            username_label: "Email (@ssss.gouv.qc.ca):",
            username_label_prescription: "Email (.med@ssss.gouv.qc.ca):",
            password_label: "Password:",
            forgot_password: "Forgot password?",
            submit: "Submit",
            cancel: "Cancel",
            login_failed_title: "Login failed",
            login_failed_message: "Incorrect username or password. Please try again.",
            required_field_error: "This field is required",
            confirm_password_label: "Password confirmation:",
            password_format_hint:
                "Minimum: 8 characters, 1 digit, 1 capital letter, 1 special character",
            password_verification_error: "Password does not match.",
            verify_email_title: "A confirmation email has been sent to you.",
            verify_email_message:
                "Click on the link in the email to complete the creation of your user account.",
            error_title: "An Error Has Occurred",
            error_message: "Your request has not been submitted.",
            try_again: "Please try again.",
            error_contact_text: "For inquiries, please contact:",
            error_contact_name: "René Allard (HSJ)",
            error_contact_email: "rene.allard.hsj@ssss.gouv.qc.ca",
            error_contact_phone: "514-345-4931 #6193",
            reset_password_title: "Forgot password?",
            reset_password_text:
                "Enter the email address you use to sign in, and we will send you a link to reset your password.",
            reset_password_confirmation_title: "Password reset email sent",
            reset_password_confirmation_message_1:
                "We have sent you a link to reset your password at:",
            reset_password_confirmation_message_2:
                "If you do not receive email, check your spam folder or contact us at:",
            update_password_title: "Create a new password",
            new_password_label: "New password",
            expiry_error_title: "Password reset link expired",
            expiry_error_message_1: "The reset password link has expired.",
            expiry_error_message_2: "Please submit a",
            expiry_error_try_again: "new request"
        },
        fr: {
            activation_title: "Demande d’accès",
            activation_text:
                "Pour l’obtention d'un accès à la plateforme clinique de séquençage à haut débit du Centre québécois de génomique clinique, veuillez contacter René Allard aux coordonnées ci-dessous :",
            login_title: "Analyses et diagnostics",
            login_title_prescription: "Prescriptions et requêtes",
            login_options: "Choisir votre identifiant",
            username_label: "Courriel (@ssss.gouv.qc.ca) :",
            username_label_prescription: "Courriel (.med@ssss.gouv.qc.ca) :",
            password_label: "Mot de passe :",
            forgot_password: "Mot de passe oublié ?",
            submit: "Soumettre",
            cancel: "Annuler",
            login_failed_title: "Connexion échouée",
            login_failed_message:
                "Il y a une erreur avec votre nom d'utilisateur ou votre mot de passe. Veuillez réessayer.",
            required_field_error: "Ce champ est obligatoire",
            confirm_password_label: "Confirmation du mot de passe :",
            password_format_hint:
                "Minimum : 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial",
            password_verification_error: "Le mot de passe ne correspond pas.",
            verify_email_title: "Un courriel de confirmation vous a été envoyé.",
            verify_email_message:
                "Cliquez sur le lien dans le courriel pour conclure la création de votre compte utilisateur.",
            error_title: "Une erreur est survenue",
            error_message: "Votre demande n'a pas été envoyée.",
            try_again: "Veuillez réessayer",
            error_contact_text: "Pour toute demande, adressez-vous à :",
            error_contact_name: "René Allard (HSJ)",
            error_contact_email: "rene.allard.hsj@ssss.gouv.qc.ca",
            error_contact_phone: "514-345-4931 #6193",
            reset_password_title: "Mot de passe oublié ?",
            reset_password_text:
                "Saisissez l'adresse courriel que vous utilisez pour vous connecter, et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
            reset_password_confirmation_title:
                "Courriel de réinitialisation de mot de passe envoyé",
            reset_password_confirmation_message_1:
                "Nous vous avons envoyé un lien pour réinitialiser votre mot de passe à l’adresse :",
            reset_password_confirmation_message_2:
                "Si vous ne recevez pas de courriel, vérifiez votre dossier de courrier indésirable ou contactez-nous au :",
            update_password_title: "Créer un nouveau mot de passe",
            new_password_label: "Nouveau mot de passe",
            expiry_error_title: "Lien de réinitialisation expiré",
            expiry_error_message_1:
                "Le lien de réinitialisation du mot de passe est expiré.",
            expiry_error_message_2: "Veuillez effectuer une",
            expiry_error_try_again: "nouvelle demande"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
