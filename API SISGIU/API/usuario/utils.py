from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from django.core.mail import send_mail
from API.settings import host_react


def render_to_pdf(template_src, context_dict={}):
	template = get_template(template_src)
	html = template.render(context_dict)
	result = BytesIO()
	pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
	if not pdf.err:
		return HttpResponse(result.getvalue(), content_type='application/pdf')
	return None


def send_welcome_mail(modulo, user):
	if(modulo == "Administrador"):
		correo = user['email']
		nombre = user['first_name'] + " " + user['last_name']
		tipo_documento = user['tipo_documento']
	else:
		correo = user.email
		nombre = user.first_name + " " + user.last_name
		tipo_documento = user.tipo_documento

	template = get_template("email_template_welcome.html")
	html = template.render(
							{
								"modulo": modulo,
								"nombre": nombre,
								"host_react": host_react,
								"tipo_documento": tipo_documento
							}
						)

	body = (
			"Hola "+nombre+", has sido registrado en el Sistema de Gestión "
			"Académico-Administrativo del Instituto de Urbanismo (SISGIU) de la UCV "
			"bajo el módulo de "+modulo+".\n\n"
			"La contraseña para acceder al sistema es su número de cédula.\n"
			"Por favor ingrese al siguiente enlace " + host_react +
			" y modifiquela a la brevedad dirigiéndose a la seccion 'Perfil'.\n\n\n"
			"Saludos,\nGrupo SISGIU\n"
			)

	try:
		send_mail('Bienvenido a SISGIU', body, 'sisgiu.fau@gmail.com', [correo], html_message=html)
		return True
	except:
		return True
