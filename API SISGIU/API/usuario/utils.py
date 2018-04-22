from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from django.core.mail import send_mail

host_react = 'http://localhost:3000/'


def render_to_pdf(template_src, context_dict={}):
	template = get_template(template_src)
	html = template.render(context_dict)
	result = BytesIO()
	pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
	if not pdf.err:
		return HttpResponse(result.getvalue(), content_type='application/pdf')
	return None


def date_handler(obj):
	return obj.isoformat() if hasattr(obj, 'isoformat') else obj


def date_handler_2(obj):
	if hasattr(obj, 'isoformat'):
		return obj.isoformat()
	else:
		raise TypeError


def send_welcome_mail(modulo, user):
	if(modulo == "Administrador"):
		correo = user['email']
		nombre = user['first_name'] + " " + user['last_name']
	else:
		correo = user.email
		nombre = user.first_name + " " + user.last_name

	body = (
			"Hola "+nombre+", has sido registrado en el Sistema de Gestión "
			"Académico-Administrativo del Instituto de Urbanismo (SISGIU) de la UCV "
			"bajo el módulo de "+modulo+".\n\n"
			"La contraseña para acceder al sistema es su número de cédula.\n"
			"Por favor ingrese al siguiente enlace " + host_react +
			" y modifiquela a la brevedad dirigiéndose a la seccion 'Perfil'.\n\n\n"
			"Saludos,\nEquipo SISGIU\n"
			)

	try:
		send_mail('Bienvenida', body, 'sisgiu.fau@gmail.com', [correo])
		return True
	except:
		return True
