--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.12
-- Dumped by pg_dump version 9.5.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account_emailaddress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_emailaddress (
    id integer NOT NULL,
    email character varying(254) NOT NULL,
    verified boolean NOT NULL,
    "primary" boolean NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.account_emailaddress OWNER TO postgres;

--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_emailaddress_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_emailaddress_id_seq OWNER TO postgres;

--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_emailaddress_id_seq OWNED BY public.account_emailaddress.id;


--
-- Name: account_emailconfirmation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_emailconfirmation (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    sent timestamp with time zone,
    key character varying(64) NOT NULL,
    email_address_id integer NOT NULL
);


ALTER TABLE public.account_emailconfirmation OWNER TO postgres;

--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_emailconfirmation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_emailconfirmation_id_seq OWNER TO postgres;

--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_emailconfirmation_id_seq OWNED BY public.account_emailconfirmation.id;


--
-- Name: asignatura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.asignatura (
    id integer NOT NULL,
    codigo character varying(6) NOT NULL,
    nombre character varying(80) NOT NULL,
    unidad_credito integer NOT NULL,
    tipo_asignatura_id integer
);


ALTER TABLE public.asignatura OWNER TO postgres;

--
-- Name: asignatura_asignatura_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asignatura_asignatura_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asignatura_asignatura_id_seq OWNER TO postgres;

--
-- Name: asignatura_asignatura_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asignatura_asignatura_id_seq OWNED BY public.asignatura.id;


--
-- Name: asignatura_tipoPostgrado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."asignatura_tipoPostgrado" (
    id integer NOT NULL,
    asignatura_id integer NOT NULL,
    tipo_postgrado_id integer NOT NULL
);


ALTER TABLE public."asignatura_tipoPostgrado" OWNER TO postgres;

--
-- Name: tipo_asignatura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_asignatura (
    id integer NOT NULL,
    nombre character varying(20) NOT NULL
);


ALTER TABLE public.tipo_asignatura OWNER TO postgres;

--
-- Name: asignatura_tipoasignatura_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asignatura_tipoasignatura_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asignatura_tipoasignatura_id_seq OWNER TO postgres;

--
-- Name: asignatura_tipoasignatura_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asignatura_tipoasignatura_id_seq OWNED BY public.tipo_asignatura.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: django_site; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_site (
    id integer NOT NULL,
    domain character varying(100) NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.django_site OWNER TO postgres;

--
-- Name: django_site_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_site_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_site_id_seq OWNER TO postgres;

--
-- Name: django_site_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_site_id_seq OWNED BY public.django_site.id;


--
-- Name: docente_asignatura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.docente_asignatura (
    id integer NOT NULL,
    aula integer NOT NULL,
    horario_dia character varying(1) NOT NULL,
    horario_hora character varying(15) NOT NULL,
    asignatura_id integer NOT NULL,
    docente_id integer NOT NULL,
    periodo_id integer NOT NULL
);


ALTER TABLE public.docente_asignatura OWNER TO postgres;

--
-- Name: estado_estudiante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estado_estudiante (
    id integer NOT NULL,
    estado character varying(20) NOT NULL
);


ALTER TABLE public.estado_estudiante OWNER TO postgres;

--
-- Name: estado_periodo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estado_periodo (
    id integer NOT NULL,
    estado character varying(25) NOT NULL
);


ALTER TABLE public.estado_periodo OWNER TO postgres;

--
-- Name: estado_tramite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estado_tramite (
    id integer NOT NULL,
    estado character varying(20) NOT NULL
);


ALTER TABLE public.estado_tramite OWNER TO postgres;

--
-- Name: estudiante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estudiante (
    usuario_id integer NOT NULL,
    direccion text NOT NULL,
    id_estado_estudiante_id integer,
    id_tipo_postgrado_id integer
);


ALTER TABLE public.estudiante OWNER TO postgres;

--
-- Name: estudiante_asignatura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estudiante_asignatura (
    id integer NOT NULL,
    nota_definitiva integer NOT NULL,
    asignatura_id integer NOT NULL,
    periodo_estudiante_id integer NOT NULL,
    retirado boolean NOT NULL
);


ALTER TABLE public.estudiante_asignatura OWNER TO postgres;

--
-- Name: estudiante_tramite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estudiante_tramite (
    id integer NOT NULL,
    fecha_creacion date NOT NULL,
    fecha_tope date NOT NULL,
    mensaje text NOT NULL,
    estado_tramite_id integer NOT NULL,
    estudiante_id integer NOT NULL,
    tramite_id integer NOT NULL
);


ALTER TABLE public.estudiante_tramite OWNER TO postgres;

--
-- Name: periodo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.periodo (
    id integer NOT NULL,
    estado_periodo_id integer,
    tipo_postgrado_id integer,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE public.periodo OWNER TO postgres;

--
-- Name: periodo_estadoperiodo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.periodo_estadoperiodo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.periodo_estadoperiodo_id_seq OWNER TO postgres;

--
-- Name: periodo_estadoperiodo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.periodo_estadoperiodo_id_seq OWNED BY public.estado_periodo.id;


--
-- Name: periodo_estudiante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.periodo_estudiante (
    id integer NOT NULL,
    pagado boolean NOT NULL,
    estudiante_id integer NOT NULL,
    periodo_id integer NOT NULL
);


ALTER TABLE public.periodo_estudiante OWNER TO postgres;

--
-- Name: periodo_periodo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.periodo_periodo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.periodo_periodo_id_seq OWNER TO postgres;

--
-- Name: periodo_periodo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.periodo_periodo_id_seq OWNED BY public.periodo.id;


--
-- Name: personal_administrativo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personal_administrativo (
    usuario_id integer NOT NULL
);


ALTER TABLE public.personal_administrativo OWNER TO postgres;

--
-- Name: personal_docente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personal_docente (
    usuario_id integer NOT NULL,
    direccion text NOT NULL,
    rif character varying(100) NOT NULL,
    curriculum character varying(100) NOT NULL,
    permiso_ingresos character varying(100) NOT NULL,
    coordinador boolean NOT NULL
);


ALTER TABLE public.personal_docente OWNER TO postgres;

--
-- Name: prelacion_asignatura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prelacion_asignatura (
    id integer NOT NULL,
    asignatura_objetivo_id character varying(6),
    asignatura_prela_id character varying(6)
);


ALTER TABLE public.prelacion_asignatura OWNER TO postgres;

--
-- Name: prelacion_asignatura_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prelacion_asignatura_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prelacion_asignatura_id_seq OWNER TO postgres;

--
-- Name: prelacion_asignatura_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prelacion_asignatura_id_seq OWNED BY public.prelacion_asignatura.id;


--
-- Name: relacion_asignaturatipopostgrado_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.relacion_asignaturatipopostgrado_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.relacion_asignaturatipopostgrado_id_seq OWNER TO postgres;

--
-- Name: relacion_asignaturatipopostgrado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.relacion_asignaturatipopostgrado_id_seq OWNED BY public."asignatura_tipoPostgrado".id;


--
-- Name: relacion_docenteasignatura_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.relacion_docenteasignatura_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.relacion_docenteasignatura_id_seq OWNER TO postgres;

--
-- Name: relacion_docenteasignatura_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.relacion_docenteasignatura_id_seq OWNED BY public.docente_asignatura.id;


--
-- Name: relacion_estudianteasignatura_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.relacion_estudianteasignatura_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.relacion_estudianteasignatura_id_seq OWNER TO postgres;

--
-- Name: relacion_estudianteasignatura_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.relacion_estudianteasignatura_id_seq OWNED BY public.estudiante_asignatura.id;


--
-- Name: relacion_estudiantetramite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.relacion_estudiantetramite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.relacion_estudiantetramite_id_seq OWNER TO postgres;

--
-- Name: relacion_estudiantetramite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.relacion_estudiantetramite_id_seq OWNED BY public.estudiante_tramite.id;


--
-- Name: relacion_periodoestudiante_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.relacion_periodoestudiante_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.relacion_periodoestudiante_id_seq OWNER TO postgres;

--
-- Name: relacion_periodoestudiante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.relacion_periodoestudiante_id_seq OWNED BY public.periodo_estudiante.id;


--
-- Name: tipo_postgrado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_postgrado (
    id integer NOT NULL,
    tipo character varying(20) NOT NULL
);


ALTER TABLE public.tipo_postgrado OWNER TO postgres;

--
-- Name: tramite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tramite (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(100) NOT NULL,
    max_numero_dias integer NOT NULL
);


ALTER TABLE public.tramite OWNER TO postgres;

--
-- Name: tramite_estadotramite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tramite_estadotramite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tramite_estadotramite_id_seq OWNER TO postgres;

--
-- Name: tramite_estadotramite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tramite_estadotramite_id_seq OWNED BY public.estado_tramite.id;


--
-- Name: tramite_tramite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tramite_tramite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tramite_tramite_id_seq OWNER TO postgres;

--
-- Name: tramite_tramite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tramite_tramite_id_seq OWNED BY public.tramite.id;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    cedula integer,
    segundo_nombre character varying(50),
    segundo_apellido character varying(50),
    correo_alternativo character varying(60) NOT NULL,
    celular character varying(14) NOT NULL,
    telefono_casa character varying(14) NOT NULL,
    telefono_trabajo character varying(14) NOT NULL,
    fecha_nacimiento date NOT NULL,
    sexo character varying(1) NOT NULL,
    nacionalidad character varying(20) NOT NULL,
    estado_civil character varying(20) NOT NULL,
    foto character varying(100) NOT NULL
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_estadoestudiante_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_estadoestudiante_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_estadoestudiante_id_seq OWNER TO postgres;

--
-- Name: usuario_estadoestudiante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_estadoestudiante_id_seq OWNED BY public.estado_estudiante.id;


--
-- Name: usuario_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario_groups (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.usuario_groups OWNER TO postgres;

--
-- Name: usuario_tipopostgrado_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_tipopostgrado_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_tipopostgrado_id_seq OWNER TO postgres;

--
-- Name: usuario_tipopostgrado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_tipopostgrado_id_seq OWNED BY public.tipo_postgrado.id;


--
-- Name: usuario_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario_user_permissions (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.usuario_user_permissions OWNER TO postgres;

--
-- Name: usuario_usuario_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_usuario_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_usuario_groups_id_seq OWNER TO postgres;

--
-- Name: usuario_usuario_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_usuario_groups_id_seq OWNED BY public.usuario_groups.id;


--
-- Name: usuario_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_usuario_id_seq OWNER TO postgres;

--
-- Name: usuario_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_usuario_id_seq OWNED BY public.usuario.id;


--
-- Name: usuario_usuario_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_usuario_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_usuario_user_permissions_id_seq OWNER TO postgres;

--
-- Name: usuario_usuario_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_usuario_user_permissions_id_seq OWNED BY public.usuario_user_permissions.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailaddress ALTER COLUMN id SET DEFAULT nextval('public.account_emailaddress_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailconfirmation ALTER COLUMN id SET DEFAULT nextval('public.account_emailconfirmation_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignatura ALTER COLUMN id SET DEFAULT nextval('public.asignatura_asignatura_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."asignatura_tipoPostgrado" ALTER COLUMN id SET DEFAULT nextval('public.relacion_asignaturatipopostgrado_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_site ALTER COLUMN id SET DEFAULT nextval('public.django_site_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.docente_asignatura ALTER COLUMN id SET DEFAULT nextval('public.relacion_docenteasignatura_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_estudiante ALTER COLUMN id SET DEFAULT nextval('public.usuario_estadoestudiante_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_periodo ALTER COLUMN id SET DEFAULT nextval('public.periodo_estadoperiodo_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_tramite ALTER COLUMN id SET DEFAULT nextval('public.tramite_estadotramite_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante_asignatura ALTER COLUMN id SET DEFAULT nextval('public.relacion_estudianteasignatura_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante_tramite ALTER COLUMN id SET DEFAULT nextval('public.relacion_estudiantetramite_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodo ALTER COLUMN id SET DEFAULT nextval('public.periodo_periodo_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodo_estudiante ALTER COLUMN id SET DEFAULT nextval('public.relacion_periodoestudiante_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prelacion_asignatura ALTER COLUMN id SET DEFAULT nextval('public.prelacion_asignatura_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_asignatura ALTER COLUMN id SET DEFAULT nextval('public.asignatura_tipoasignatura_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_postgrado ALTER COLUMN id SET DEFAULT nextval('public.usuario_tipopostgrado_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tramite ALTER COLUMN id SET DEFAULT nextval('public.tramite_tramite_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_usuario_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_groups ALTER COLUMN id SET DEFAULT nextval('public.usuario_usuario_groups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.usuario_usuario_user_permissions_id_seq'::regclass);


--
-- Data for Name: account_emailaddress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_emailaddress (id, email, verified, "primary", user_id) FROM stdin;
\.


--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_emailaddress_id_seq', 1, false);


--
-- Data for Name: account_emailconfirmation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_emailconfirmation (id, created, sent, key, email_address_id) FROM stdin;
\.


--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_emailconfirmation_id_seq', 1, false);


--
-- Data for Name: asignatura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.asignatura (id, codigo, nombre, unidad_credito, tipo_asignatura_id) FROM stdin;
1	M001	Matematicas I	6	1
2	M002	Matematicas II	6	1
3	M003	Matematicas III	6	1
4	I001	Introduccion a la Informatica	4	1
5	D001	Matematicas Discretas I	5	1
6	D002	Matematicas Discretas II	5	1
7	AP01	Algoritmos y Programacion	4	1
8	AP02	Algoritmos y Estructuras de Datos	4	1
9	OE01	Organizacion y Estructura del Computador I	5	1
10	OE02	Organizacion y Estructura del Computador II	5	1
11	D003	Matematicas Discretas III	5	1
12	BD01	Bases de Datos	4	1
\.


--
-- Name: asignatura_asignatura_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asignatura_asignatura_id_seq', 12, true);


--
-- Data for Name: asignatura_tipoPostgrado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."asignatura_tipoPostgrado" (id, asignatura_id, tipo_postgrado_id) FROM stdin;
\.


--
-- Name: asignatura_tipoasignatura_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asignatura_tipoasignatura_id_seq', 2, true);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add personal docente	1	add_personaldocente
2	Can change personal docente	1	change_personaldocente
3	Can delete personal docente	1	delete_personaldocente
4	Can add personal administrativo	2	add_personaladministrativo
5	Can change personal administrativo	2	change_personaladministrativo
6	Can delete personal administrativo	2	delete_personaladministrativo
7	Can add usuario	3	add_usuario
8	Can change usuario	3	change_usuario
9	Can delete usuario	3	delete_usuario
10	Can add tipo postgrado	4	add_tipopostgrado
11	Can change tipo postgrado	4	change_tipopostgrado
12	Can delete tipo postgrado	4	delete_tipopostgrado
13	Can add estado estudiante	5	add_estadoestudiante
14	Can change estado estudiante	5	change_estadoestudiante
15	Can delete estado estudiante	5	delete_estadoestudiante
16	Can add estudiante	6	add_estudiante
17	Can change estudiante	6	change_estudiante
18	Can delete estudiante	6	delete_estudiante
19	Can add periodo	7	add_periodo
20	Can change periodo	7	change_periodo
21	Can delete periodo	7	delete_periodo
22	Can add estado periodo	8	add_estadoperiodo
23	Can change estado periodo	8	change_estadoperiodo
24	Can delete estado periodo	8	delete_estadoperiodo
25	Can add estado tramite	9	add_estadotramite
26	Can change estado tramite	9	change_estadotramite
27	Can delete estado tramite	9	delete_estadotramite
28	Can add tramite	10	add_tramite
29	Can change tramite	10	change_tramite
30	Can delete tramite	10	delete_tramite
31	Can add tipo asignatura	11	add_tipoasignatura
32	Can change tipo asignatura	11	change_tipoasignatura
33	Can delete tipo asignatura	11	delete_tipoasignatura
34	Can add prelacion asignatura	12	add_prelacionasignatura
35	Can change prelacion asignatura	12	change_prelacionasignatura
36	Can delete prelacion asignatura	12	delete_prelacionasignatura
37	Can add asignatura	13	add_asignatura
38	Can change asignatura	13	change_asignatura
39	Can delete asignatura	13	delete_asignatura
40	Can add asignatura tipo postgrado	14	add_asignaturatipopostgrado
41	Can change asignatura tipo postgrado	14	change_asignaturatipopostgrado
42	Can delete asignatura tipo postgrado	14	delete_asignaturatipopostgrado
43	Can add periodo estudiante	15	add_periodoestudiante
44	Can change periodo estudiante	15	change_periodoestudiante
45	Can delete periodo estudiante	15	delete_periodoestudiante
46	Can add estudiante tramite	16	add_estudiantetramite
47	Can change estudiante tramite	16	change_estudiantetramite
48	Can delete estudiante tramite	16	delete_estudiantetramite
49	Can add estudiante asignatura	17	add_estudianteasignatura
50	Can change estudiante asignatura	17	change_estudianteasignatura
51	Can delete estudiante asignatura	17	delete_estudianteasignatura
52	Can add docente asignatura	18	add_docenteasignatura
53	Can change docente asignatura	18	change_docenteasignatura
54	Can delete docente asignatura	18	delete_docenteasignatura
55	Can add log entry	19	add_logentry
56	Can change log entry	19	change_logentry
57	Can delete log entry	19	delete_logentry
58	Can add group	20	add_group
59	Can change group	20	change_group
60	Can delete group	20	delete_group
61	Can add permission	21	add_permission
62	Can change permission	21	change_permission
63	Can delete permission	21	delete_permission
64	Can add content type	22	add_contenttype
65	Can change content type	22	change_contenttype
66	Can delete content type	22	delete_contenttype
67	Can add session	23	add_session
68	Can change session	23	change_session
69	Can delete session	23	delete_session
70	Can add site	24	add_site
71	Can change site	24	change_site
72	Can delete site	24	delete_site
73	Can add email confirmation	25	add_emailconfirmation
74	Can change email confirmation	25	change_emailconfirmation
75	Can delete email confirmation	25	delete_emailconfirmation
76	Can add email address	26	add_emailaddress
77	Can change email address	26	change_emailaddress
78	Can delete email address	26	delete_emailaddress
\.


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 78, true);


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2018-04-08 21:19:29.1321-04	1	24635907	2	[{"changed": {"fields": ["first_name", "last_name", "cedula", "segundo_nombre", "segundo_apellido"]}}]	3	1
2	2018-04-08 22:16:08.272955-04	1	Obligatoria	1	[{"added": {}}]	11	1
3	2018-04-08 22:16:15.334607-04	2	Electiva	1	[{"added": {}}]	11	1
4	2018-04-08 22:26:23.394359-04	1	activo	1	[{"added": {}}]	8	1
5	2018-04-08 22:26:30.365687-04	2	en inscripcion	1	[{"added": {}}]	8	1
6	2018-04-08 22:26:34.306239-04	3	finalizado	1	[{"added": {}}]	8	1
7	2018-04-08 22:26:39.034541-04	4	no iniciado	1	[{"added": {}}]	8	1
8	2018-04-08 22:26:58.22901-04	1	Doctorado	1	[{"added": {}}]	4	1
9	2018-04-08 22:27:02.848064-04	2	Especializacion	1	[{"added": {}}]	4	1
10	2018-04-08 22:27:06.962583-04	3	Maestria	1	[{"added": {}}]	4	1
11	2018-04-08 22:28:43.501903-04	1	activo	1	[{"added": {}}]	5	1
12	2018-04-08 22:28:58.172279-04	2	reincorporado	1	[{"added": {}}]	5	1
13	2018-04-08 22:29:02.19974-04	3	retirado	1	[{"added": {}}]	5	1
14	2018-04-08 22:29:08.495209-04	4	reingresado	1	[{"added": {}}]	5	1
15	2018-04-08 22:47:05.456702-04	2	24635906	2	[{"changed": {"fields": ["id_estado_estudiante"]}}]	6	1
16	2018-04-09 19:46:17.196374-04	1	I-2017 Doctorado, 24635906	3		15	1
17	2018-04-09 19:56:22.574952-04	2	I-2017 Doctorado, 24635906	3		15	1
18	2018-04-09 20:02:43.802085-04	3	I-2017 Doctorado, 24635906	3		15	1
19	2018-04-09 20:07:26.176247-04	4	I-2017 Doctorado, 24635906	3		15	1
20	2018-04-09 20:16:24.578101-04	5	I-2017 Doctorado, 24635906	3		15	1
21	2018-04-09 20:19:23.883226-04	6	I-2017 Doctorado, 24635906	3		15	1
22	2018-04-09 20:22:04.803787-04	7	I-2017 Doctorado, 24635906	3		15	1
23	2018-04-09 20:23:42.716632-04	8	I-2017 Doctorado, 24635906	3		15	1
24	2018-04-09 20:47:30.646472-04	9	I-2017 Doctorado, 24635906	3		15	1
25	2018-04-09 21:02:52.833288-04	1	I-2017 Doctorado	2	[{"changed": {"fields": ["estado_periodo"]}}]	7	1
26	2018-04-09 21:48:08.050671-04	7	15263745	2	[{"changed": {"fields": ["id_estado_estudiante"]}}]	6	1
\.


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 26, true);


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	usuario	personaldocente
2	usuario	personaladministrativo
3	usuario	usuario
4	usuario	tipopostgrado
5	usuario	estadoestudiante
6	usuario	estudiante
7	periodo	periodo
8	periodo	estadoperiodo
9	tramite	estadotramite
10	tramite	tramite
11	asignatura	tipoasignatura
12	asignatura	prelacionasignatura
13	asignatura	asignatura
14	relacion	asignaturatipopostgrado
15	relacion	periodoestudiante
16	relacion	estudiantetramite
17	relacion	estudianteasignatura
18	relacion	docenteasignatura
19	admin	logentry
20	auth	group
21	auth	permission
22	contenttypes	contenttype
23	sessions	session
24	sites	site
25	account	emailconfirmation
26	account	emailaddress
\.


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 26, true);


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2018-04-08 21:12:30.706718-04
2	contenttypes	0002_remove_content_type_name	2018-04-08 21:12:30.739236-04
3	auth	0001_initial	2018-04-08 21:12:31.309116-04
4	auth	0002_alter_permission_name_max_length	2018-04-08 21:12:31.383836-04
5	auth	0003_alter_user_email_max_length	2018-04-08 21:12:31.400315-04
6	auth	0004_alter_user_username_opts	2018-04-08 21:12:31.411218-04
7	auth	0005_alter_user_last_login_null	2018-04-08 21:12:31.422046-04
8	auth	0006_require_contenttypes_0002	2018-04-08 21:12:31.42809-04
9	auth	0007_alter_validators_add_error_messages	2018-04-08 21:12:31.444195-04
10	auth	0008_alter_user_username_max_length	2018-04-08 21:12:31.455795-04
11	auth	0009_alter_user_last_name_max_length	2018-04-08 21:12:31.466122-04
12	usuario	0001_initial	2018-04-08 21:12:32.814625-04
13	account	0001_initial	2018-04-08 21:12:33.336641-04
14	account	0002_email_max_length	2018-04-08 21:12:33.411567-04
15	admin	0001_initial	2018-04-08 21:12:33.659457-04
16	admin	0002_logentry_remove_auto_add	2018-04-08 21:12:33.709198-04
17	asignatura	0001_initial	2018-04-08 21:12:34.037509-04
18	asignatura	0002_auto_20180226_1551	2018-04-08 21:12:34.079431-04
19	asignatura	0003_auto_20180226_2220	2018-04-08 21:12:34.215186-04
20	asignatura	0004_auto_20180308_2042	2018-04-08 21:12:34.268314-04
21	asignatura	0005_prelacionasignatura	2018-04-08 21:12:34.538026-04
22	asignatura	0006_auto_20180311_2030	2018-04-08 21:12:35.029406-04
23	asignatura	0007_auto_20180313_2109	2018-04-08 21:12:35.073069-04
24	asignatura	0008_remove_asignatura_tipo_postgrado	2018-04-08 21:12:35.112929-04
25	periodo	0001_initial	2018-04-08 21:12:35.394442-04
26	periodo	0002_periodo_nombre	2018-04-08 21:12:35.628731-04
27	periodo	0003_auto_20180308_2042	2018-04-08 21:12:35.680591-04
28	periodo	0004_auto_20180308_2051	2018-04-08 21:12:35.702703-04
29	periodo	0005_auto_20180409_0112	2018-04-08 21:12:35.72013-04
30	tramite	0001_initial	2018-04-08 21:12:35.872591-04
31	relacion	0001_initial	2018-04-08 21:12:37.053456-04
32	relacion	0002_auto_20180114_1614	2018-04-08 21:12:37.621296-04
33	relacion	0003_auto_20180308_2042	2018-04-08 21:12:37.716193-04
34	relacion	0004_estudianteasignatura_retirado	2018-04-08 21:12:37.953296-04
35	relacion	0005_auto_20180409_0112	2018-04-08 21:12:37.974951-04
36	sessions	0001_initial	2018-04-08 21:12:38.208501-04
37	sites	0001_initial	2018-04-08 21:12:38.286754-04
38	sites	0002_alter_domain_unique	2018-04-08 21:12:38.430632-04
39	tramite	0002_auto_20180308_2042	2018-04-08 21:12:38.484215-04
40	usuario	0002_auto_20180107_1249	2018-04-08 21:12:38.550422-04
41	usuario	0003_auto_20180107_1607	2018-04-08 21:12:38.570565-04
42	usuario	0004_auto_20180107_1612	2018-04-08 21:12:38.60583-04
43	usuario	0005_auto_20180107_1614	2018-04-08 21:12:38.639271-04
44	usuario	0006_auto_20180107_1615	2018-04-08 21:12:38.66224-04
45	usuario	0007_auto_20180107_1616	2018-04-08 21:12:38.694442-04
46	usuario	0008_auto_20180107_1620	2018-04-08 21:12:38.772492-04
47	usuario	0009_auto_20180107_2008	2018-04-08 21:12:38.815032-04
48	usuario	0010_auto_20180108_0952	2018-04-08 21:12:38.849597-04
49	usuario	0011_auto_20180108_1931	2018-04-08 21:12:38.874463-04
50	usuario	0010_auto_20180108_2116	2018-04-08 21:12:38.89567-04
51	usuario	0012_merge_20180108_2129	2018-04-08 21:12:38.905588-04
52	usuario	0013_auto_20180108_2150	2018-04-08 21:12:38.972163-04
53	usuario	0014_auto_20180224_1824	2018-04-08 21:12:39.081546-04
54	usuario	0015_auto_20180304_1922	2018-04-08 21:12:39.109434-04
55	usuario	0016_auto_20180304_1934	2018-04-08 21:12:39.17634-04
56	usuario	0017_auto_20180308_2036	2018-04-08 21:12:39.205445-04
57	usuario	0018_auto_20180308_2039	2018-04-08 21:12:39.331108-04
58	usuario	0019_auto_20180409_0357	2018-04-08 23:58:00.865064-04
\.


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 58, true);


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
b9xya38y6qfyj4eobjhi8qhzbzhje9wh	MzYxNjU2MTBhOGI4NGZhMmIzMDY1MmY1NzM4YjhlYmVlMzdiYWJlNjp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-22 21:20:25.073016-04
ju5xhbwm8acl8u4bxk6ycjyy77bgh08h	MzYxNjU2MTBhOGI4NGZhMmIzMDY1MmY1NzM4YjhlYmVlMzdiYWJlNjp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-22 21:22:59.336944-04
e5gijy0w9x4e85lqysav94nf67uqw988	MzYxNjU2MTBhOGI4NGZhMmIzMDY1MmY1NzM4YjhlYmVlMzdiYWJlNjp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-22 21:23:16.883704-04
3tj3yh5892pg22ifd3uf6mwe7v6anslk	MzYxNjU2MTBhOGI4NGZhMmIzMDY1MmY1NzM4YjhlYmVlMzdiYWJlNjp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-22 21:23:21.544952-04
l0nkgk6euclpj4f4b1ahkiautndnjeav	MzYxNjU2MTBhOGI4NGZhMmIzMDY1MmY1NzM4YjhlYmVlMzdiYWJlNjp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-22 21:23:24.819228-04
6t734d99ti6pto7rqp0nsgtbjsdybbgi	MzYxNjU2MTBhOGI4NGZhMmIzMDY1MmY1NzM4YjhlYmVlMzdiYWJlNjp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-22 21:23:33.294529-04
30nnr30v7vjmd3a1e5rxr6wsiec3rmxj	MzYxNjU2MTBhOGI4NGZhMmIzMDY1MmY1NzM4YjhlYmVlMzdiYWJlNjp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-22 21:23:51.008369-04
fr3m1b3ujidmr11keqot44tru06csh14	MzYxNjU2MTBhOGI4NGZhMmIzMDY1MmY1NzM4YjhlYmVlMzdiYWJlNjp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-22 21:30:21.601962-04
ms5lonea8eziwny3ayl8zy3wchq8g4is	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-22 21:57:18.983322-04
a0ajx9wc5cnnlkxykrk4wdcdxp584aog	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-22 21:57:24.600572-04
fxjbh5lo5yaxsb2vsu6ho1yb3f2chk8l	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-22 22:04:17.790237-04
0oju6v18wn0dgo4jkhqd8gegny98npkw	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-22 22:15:51.849717-04
ulfollhujbnbwssvlep8si16jrv20b8r	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-22 22:29:23.724291-04
nyqplfhqogzycu2b48iyl50s03x78ody	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-22 22:29:49.604179-04
is3b3qgsyhwhfazivktkpz2zuzdkx17l	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-22 22:31:40.905483-04
bph2ttz3srpnjcb3jpgs7q2674pjjugz	NWFiNDIzMTUyOWJiZmJmZDA4NDA1YjgyNWU1ZDQ0ZTMyMGY5ZGIyNTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9oYXNoIjoiY2YzYzg2MGM3NzczYjE0Yjc3OGM1MDViMTdkMDI3OTA5NjMxMDg1YyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-22 22:34:20.498419-04
h07cxsvg02ejsjx6hu5yog87hwm0x726	ZTI4NjBiMDZiZDAxZjE2MmRkMmEwZTM5MzJkMTE5YTM2NDZmY2Y3ODp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiY2YzYzg2MGM3NzczYjE0Yjc3OGM1MDViMTdkMDI3OTA5NjMxMDg1YyIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-22 22:44:41.408372-04
1pejgl4ytt7k4ai2909jvb04bnhpsd7e	MWU2NTBhMTk0MWU3MzY3ZmY1NmYyNzk0MTc2YjRmMjM3YzkxNmJmNzp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6IjEiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-22 22:46:09.735828-04
7zdm05flcwoc8fexn7ucc1lsnpslrlr9	MWU2NTBhMTk0MWU3MzY3ZmY1NmYyNzk0MTc2YjRmMjM3YzkxNmJmNzp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6IjEiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-22 22:47:12.971663-04
3ezd7r1m7jqgt1su5aigbmsk72ayo0jh	ZjI2NWEzOTQ2YzNlM2Y1ZDkwODNhNmIwNmY2ODY1N2I4MWZhMjBmOTp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6IjIiLCJfYXV0aF91c2VyX2hhc2giOiJlOGU0MjI1MGIxZWM5YzFmYTkyNzQ3ODI2MzIyMDFmYzJmMTdlMmQwIn0=	2018-04-22 23:54:05.024338-04
slog48x1ix20k7ihoyigg5p34216zoyi	MWU2NTBhMTk0MWU3MzY3ZmY1NmYyNzk0MTc2YjRmMjM3YzkxNmJmNzp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6IjEiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-22 23:55:18.070732-04
9sohnfrxd8c6hue3ysbtkml4ixcugx52	ZjI2NWEzOTQ2YzNlM2Y1ZDkwODNhNmIwNmY2ODY1N2I4MWZhMjBmOTp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9pZCI6IjIiLCJfYXV0aF91c2VyX2hhc2giOiJlOGU0MjI1MGIxZWM5YzFmYTkyNzQ3ODI2MzIyMDFmYzJmMTdlMmQwIn0=	2018-04-22 23:55:36.924683-04
n86xn1t8vp9s5q9avnfaluoauohxwua4	NWFiNDIzMTUyOWJiZmJmZDA4NDA1YjgyNWU1ZDQ0ZTMyMGY5ZGIyNTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9oYXNoIjoiY2YzYzg2MGM3NzczYjE0Yjc3OGM1MDViMTdkMDI3OTA5NjMxMDg1YyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 00:00:42.111239-04
g0c02uaxlt8kn5qr13z04ny1tg7sygii	YjY3NzA0ZjJhNWIxM2Y0M2M1Yjg4ZTVkNzQ1YjAwZTQ1MjdkNmM4Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9oYXNoIjoiZThlNDIyNTBiMWVjOWMxZmE5Mjc0NzgyNjMyMjAxZmMyZjE3ZTJkMCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 00:10:15.455021-04
itpzpmpe83l2j5tazedunpogzhpbw03h	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-23 21:34:23.830871-04
4b6j3iv8x4vlj8adropvtlef28z36atu	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 19:43:58.580586-04
y7cw1x513enffvi3r46jc2655ihif6ex	MjhhOGVhZTg0M2Y3MjM2M2NmZmViZThhNjY1ODk5ZjY4NjgzMTU5Njp7Il9hdXRoX3VzZXJfaGFzaCI6ImU4ZTQyMjUwYjFlYzljMWZhOTI3NDc4MjYzMjIwMWZjMmYxN2UyZDAiLCJfYXV0aF91c2VyX2lkIjoiMiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 19:46:01.066692-04
pf96rkr393pgj7rc6xc3hl6d70orbfh9	MjhhOGVhZTg0M2Y3MjM2M2NmZmViZThhNjY1ODk5ZjY4NjgzMTU5Njp7Il9hdXRoX3VzZXJfaGFzaCI6ImU4ZTQyMjUwYjFlYzljMWZhOTI3NDc4MjYzMjIwMWZjMmYxN2UyZDAiLCJfYXV0aF91c2VyX2lkIjoiMiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 20:07:49.043069-04
4caimg5typcfdj40cz7rc9z7tttxh731	MjhhOGVhZTg0M2Y3MjM2M2NmZmViZThhNjY1ODk5ZjY4NjgzMTU5Njp7Il9hdXRoX3VzZXJfaGFzaCI6ImU4ZTQyMjUwYjFlYzljMWZhOTI3NDc4MjYzMjIwMWZjMmYxN2UyZDAiLCJfYXV0aF91c2VyX2lkIjoiMiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 20:18:51.669666-04
yx5xnxs4qrxqb82um8pur14pso5mobsh	MjhhOGVhZTg0M2Y3MjM2M2NmZmViZThhNjY1ODk5ZjY4NjgzMTU5Njp7Il9hdXRoX3VzZXJfaGFzaCI6ImU4ZTQyMjUwYjFlYzljMWZhOTI3NDc4MjYzMjIwMWZjMmYxN2UyZDAiLCJfYXV0aF91c2VyX2lkIjoiMiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 20:46:43.344622-04
g3xywzb9wptdc8j0y3c81jc0duc2swy3	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 20:48:21.756889-04
9pou2v65ptef29ikxk788wgup5pygt1i	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 20:48:49.43129-04
zrbfce65nt9zx873ir6a3j1ek77kcsl0	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 20:49:10.37053-04
4i4iwprw2ygpphoqw903akssznsdslr5	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 20:49:30.402751-04
1pr0k8psq2z5mqaytybea8drnxb4ea9k	MjhhOGVhZTg0M2Y3MjM2M2NmZmViZThhNjY1ODk5ZjY4NjgzMTU5Njp7Il9hdXRoX3VzZXJfaGFzaCI6ImU4ZTQyMjUwYjFlYzljMWZhOTI3NDc4MjYzMjIwMWZjMmYxN2UyZDAiLCJfYXV0aF91c2VyX2lkIjoiMiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 20:49:42.811851-04
9sl8pi70m8zzku093bvhl4ev1i3bmlul	YjY3NzA0ZjJhNWIxM2Y0M2M1Yjg4ZTVkNzQ1YjAwZTQ1MjdkNmM4Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9oYXNoIjoiZThlNDIyNTBiMWVjOWMxZmE5Mjc0NzgyNjMyMjAxZmMyZjE3ZTJkMCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 20:52:37.349264-04
jsasvwilca2k8vie5vvdo8d1lg3gmfzm	MjhhOGVhZTg0M2Y3MjM2M2NmZmViZThhNjY1ODk5ZjY4NjgzMTU5Njp7Il9hdXRoX3VzZXJfaGFzaCI6ImU4ZTQyMjUwYjFlYzljMWZhOTI3NDc4MjYzMjIwMWZjMmYxN2UyZDAiLCJfYXV0aF91c2VyX2lkIjoiMiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 20:57:00.896231-04
f0xa47rboeqq0hs3ga40op5dcep845gd	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 21:03:11.538297-04
yejdss0y39an7e5snje63x32ix1uprh0	ZjA4MGFkMjUyMGE3OGIxOGE4MWQ2YWEyOGY4NTY1YmNmZTg5ZTFmMDp7Il9hdXRoX3VzZXJfaGFzaCI6IjlkMWE0ODlmOGViM2ExN2Q0OWMwM2ViY2IwYzkyMjMxZTk3ODY0YzAiLCJfYXV0aF91c2VyX2lkIjoiNiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 21:03:29.862741-04
msfr4619p6iiq75szpzj2vljxrwr5eom	MjhhOGVhZTg0M2Y3MjM2M2NmZmViZThhNjY1ODk5ZjY4NjgzMTU5Njp7Il9hdXRoX3VzZXJfaGFzaCI6ImU4ZTQyMjUwYjFlYzljMWZhOTI3NDc4MjYzMjIwMWZjMmYxN2UyZDAiLCJfYXV0aF91c2VyX2lkIjoiMiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 21:03:48.018487-04
efy3uw178s92v5b34px2gn2313q6mcsm	NzE0ODUzNzRkMjdjZGIxMGI0OWYwMGJkMDcwZmFmZGI4MGM4YjExNTp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 21:03:56.176151-04
h3m02d8ys3wh3oy2cg28r4gf11jbyccy	MjhhOGVhZTg0M2Y3MjM2M2NmZmViZThhNjY1ODk5ZjY4NjgzMTU5Njp7Il9hdXRoX3VzZXJfaGFzaCI6ImU4ZTQyMjUwYjFlYzljMWZhOTI3NDc4MjYzMjIwMWZjMmYxN2UyZDAiLCJfYXV0aF91c2VyX2lkIjoiMiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIn0=	2018-04-23 21:04:01.376415-04
6psk38hoympsot8mrrkcu2e1yko405a0	OTBiYzExZjU0OThlMWZiNmI5Y2ZlNWQ3OGEzYzE1MzMzMTlhOTkwODp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZThlNDIyNTBiMWVjOWMxZmE5Mjc0NzgyNjMyMjAxZmMyZjE3ZTJkMCIsIl9hdXRoX3VzZXJfaWQiOiIyIn0=	2018-04-23 21:07:56.908518-04
6wu23aj8mvs1val2zao5jf2mlfb90ipe	ZTI4NjBiMDZiZDAxZjE2MmRkMmEwZTM5MzJkMTE5YTM2NDZmY2Y3ODp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiY2YzYzg2MGM3NzczYjE0Yjc3OGM1MDViMTdkMDI3OTA5NjMxMDg1YyIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-23 21:08:03.341025-04
uuhe8pkbul2jtpo1nf3k7gmo18cpjw21	OTBiYzExZjU0OThlMWZiNmI5Y2ZlNWQ3OGEzYzE1MzMzMTlhOTkwODp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZThlNDIyNTBiMWVjOWMxZmE5Mjc0NzgyNjMyMjAxZmMyZjE3ZTJkMCIsIl9hdXRoX3VzZXJfaWQiOiIyIn0=	2018-04-23 21:08:10.383775-04
kt62pvr0ps0pyskqydsew8r5ey21aqhn	OTBiYzExZjU0OThlMWZiNmI5Y2ZlNWQ3OGEzYzE1MzMzMTlhOTkwODp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZThlNDIyNTBiMWVjOWMxZmE5Mjc0NzgyNjMyMjAxZmMyZjE3ZTJkMCIsIl9hdXRoX3VzZXJfaWQiOiIyIn0=	2018-04-23 21:08:20.620084-04
1tp577twjl3hrhec7i5bx4zcilnd31i6	OTBiYzExZjU0OThlMWZiNmI5Y2ZlNWQ3OGEzYzE1MzMzMTlhOTkwODp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZThlNDIyNTBiMWVjOWMxZmE5Mjc0NzgyNjMyMjAxZmMyZjE3ZTJkMCIsIl9hdXRoX3VzZXJfaWQiOiIyIn0=	2018-04-23 21:10:14.464967-04
yaas6qa4m75tix5il10oexwnjvhag37a	ZTI4NjBiMDZiZDAxZjE2MmRkMmEwZTM5MzJkMTE5YTM2NDZmY2Y3ODp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiY2YzYzg2MGM3NzczYjE0Yjc3OGM1MDViMTdkMDI3OTA5NjMxMDg1YyIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-23 21:10:36.40462-04
m3qwe3u44k7fh3x5tkuoi9in04ux83bv	ZTI4NjBiMDZiZDAxZjE2MmRkMmEwZTM5MzJkMTE5YTM2NDZmY2Y3ODp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiY2YzYzg2MGM3NzczYjE0Yjc3OGM1MDViMTdkMDI3OTA5NjMxMDg1YyIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-23 21:11:45.13712-04
b8j3kmnkdqw8pgjstowimeqq4ncl2xcb	NTMwZWExNWZkMGM2MDE3YWFkYzg1MTRiYzZiMWYwZTdjMzdiYTBmNjp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlOGU0MjI1MGIxZWM5YzFmYTkyNzQ3ODI2MzIyMDFmYzJmMTdlMmQwIn0=	2018-04-23 21:34:35.718582-04
85gpo546q3ksr0e9ufkg6rx0wjia2f6f	YWE1YzJjODhkNWJkYjQ0ZWI5YTU0MjMyODIzZjVkNmVhN2Q1ZjY0Yzp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNjYwMWEzMTI0OTI2NzYwYTRhM2Q1MGFiOGI3MTRmNTQyYmE3YzkxZSIsIl9hdXRoX3VzZXJfaWQiOiI0In0=	2018-04-23 21:11:58.126674-04
njog199m6zfexviyzr23yesi2s8krl2b	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-23 21:35:30.578205-04
pqij8701vlv8pnfcihdcpryxlmziy9zv	OTBiYzExZjU0OThlMWZiNmI5Y2ZlNWQ3OGEzYzE1MzMzMTlhOTkwODp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZThlNDIyNTBiMWVjOWMxZmE5Mjc0NzgyNjMyMjAxZmMyZjE3ZTJkMCIsIl9hdXRoX3VzZXJfaWQiOiIyIn0=	2018-04-23 21:12:14.546073-04
20w3r30wyuzoznd1j5xltr370h6vxc31	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-23 21:35:33.424041-04
ja6cmpy625lhsna7i9qhmaxat81mg4uo	ZTI4NjBiMDZiZDAxZjE2MmRkMmEwZTM5MzJkMTE5YTM2NDZmY2Y3ODp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiY2YzYzg2MGM3NzczYjE0Yjc3OGM1MDViMTdkMDI3OTA5NjMxMDg1YyIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-23 21:12:34.426338-04
ajx7qr169egp0e9b3pc615pbvjk70whb	NDM4NWEyNzdmNGQwZWY1MWJmMzgwOTY4MjA5YjMzZjJkOTkwYzQ1NDp7Il9hdXRoX3VzZXJfaWQiOiI1IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4MDQ3NTRlNzgxYzc0OTRiOTNhMTZjN2M5MDZmMjBjODYyY2E0NmMxIn0=	2018-04-23 21:35:46.748289-04
fkjgudb0d83jrlc9sx0eo7c7rqabc1fm	OTBiYzExZjU0OThlMWZiNmI5Y2ZlNWQ3OGEzYzE1MzMzMTlhOTkwODp7Il9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZThlNDIyNTBiMWVjOWMxZmE5Mjc0NzgyNjMyMjAxZmMyZjE3ZTJkMCIsIl9hdXRoX3VzZXJfaWQiOiIyIn0=	2018-04-23 21:12:44.965795-04
cec3iwnwq92ynm4ofcooxd9qtz32uxmc	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-23 21:36:06.544406-04
v6hgzvcv3t4od7ulbpsrmgjk6s3tx36f	MmJkMmY0YmU0ODMwNWQ4MjAwNzA2MGJkNWE4MDY3ZmMzNjc3MmNlZTp7Il9hdXRoX3VzZXJfaGFzaCI6ImU4ZTQyMjUwYjFlYzljMWZhOTI3NDc4MjYzMjIwMWZjMmYxN2UyZDAiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIyIn0=	2018-04-23 21:14:23.542294-04
gl0j6rp5hwfscliksfmbk97fj7y98xa2	N2JmZmZkNDRmNTg3YzdiMjE2YjFiMjU2MzQ2MTIyOWUxM2NhMzRhZDp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzMmFjYjdkY2ViODA5ZDNlNmM0ZjczMWUyZTE2M2ZmZDMxMmM1Y2YxIn0=	2018-04-23 21:36:23.846103-04
8w99qsljmec7sb7tofuvx8nmdy5qcshz	ZmViNGM2M2Y1NzFkOTFjZGQ1YTUyOTkwYjViNzZiMGQ5NDA5ZGMyNjp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2NjAxYTMxMjQ5MjY3NjBhNGEzZDUwYWI4YjcxNGY1NDJiYTdjOTFlIn0=	2018-04-23 21:16:01.159984-04
4hv8tqazevuqmaq234m2k021qsr12hvc	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-23 21:38:31.777059-04
n60aygvqinoptsug7arue2bsmkjoocgq	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-23 21:30:29.590738-04
ipq45anyireqjpgabkulbhninb0a0h2h	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-23 21:44:02.599065-04
1i3rca7mjawvufc3g1nguq5vuwk1i1ig	NTMwZWExNWZkMGM2MDE3YWFkYzg1MTRiYzZiMWYwZTdjMzdiYTBmNjp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlOGU0MjI1MGIxZWM5YzFmYTkyNzQ3ODI2MzIyMDFmYzJmMTdlMmQwIn0=	2018-04-23 21:33:01.965836-04
avw89igg82dzppnt6ah55ew9duiarpet	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-23 21:48:13.058108-04
gc8hggpiim2u2xmcbqmsyd8sppw54dzi	ZmViNGM2M2Y1NzFkOTFjZGQ1YTUyOTkwYjViNzZiMGQ5NDA5ZGMyNjp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2NjAxYTMxMjQ5MjY3NjBhNGEzZDUwYWI4YjcxNGY1NDJiYTdjOTFlIn0=	2018-04-23 21:33:14.034475-04
13zbpj5kbp9z38isi2dmkr9nwbvmuy4w	ZmViNGM2M2Y1NzFkOTFjZGQ1YTUyOTkwYjViNzZiMGQ5NDA5ZGMyNjp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2NjAxYTMxMjQ5MjY3NjBhNGEzZDUwYWI4YjcxNGY1NDJiYTdjOTFlIn0=	2018-04-23 21:33:26.581232-04
k554ql280w54k4enrydwec6izfp6qkyd	ZmViNGM2M2Y1NzFkOTFjZGQ1YTUyOTkwYjViNzZiMGQ5NDA5ZGMyNjp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2NjAxYTMxMjQ5MjY3NjBhNGEzZDUwYWI4YjcxNGY1NDJiYTdjOTFlIn0=	2018-04-23 21:33:40.515431-04
9wipsm3z84j9y7r2bxubbeu95m8d9x8e	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-23 21:33:52.903383-04
gp0fv8zt28g9mireuhaa07wzx22wbali	NjExMzBiYTk2YWEzZjc5ZmZiMGY0YjkzNzU2MzgyMGExN2E5MzY4Njp7Il9hdXRoX3VzZXJfaWQiOiI2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5ZDFhNDg5ZjhlYjNhMTdkNDljMDNlYmNiMGM5MjIzMWU5Nzg2NGMwIn0=	2018-04-23 21:34:04.02868-04
eifnylwrfrwr9pmfj471ie8v7tmpwszo	MzYxNjU2MTBhOGI4NGZhMmIzMDY1MmY1NzM4YjhlYmVlMzdiYWJlNjp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-23 21:59:05.396913-04
vtrec48r08xl2hgdrhpa3qnrfakuspun	MzYxNjU2MTBhOGI4NGZhMmIzMDY1MmY1NzM4YjhlYmVlMzdiYWJlNjp7Il9hdXRoX3VzZXJfaGFzaCI6ImNmM2M4NjBjNzc3M2IxNGI3NzhjNTA1YjE3ZDAyNzkwOTYzMTA4NWMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2018-04-23 22:08:17.208567-04
zdmbif5dptrq8x0aaq9tvydtzxq62c1z	MmJkMmY0YmU0ODMwNWQ4MjAwNzA2MGJkNWE4MDY3ZmMzNjc3MmNlZTp7Il9hdXRoX3VzZXJfaGFzaCI6ImU4ZTQyMjUwYjFlYzljMWZhOTI3NDc4MjYzMjIwMWZjMmYxN2UyZDAiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIyIn0=	2018-04-23 22:15:23.368524-04
zuju8olzwe8fau4sg0a00d4s0ap3wt85	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-24 18:37:34.953397-04
xh479z489k8clix0pec9bbowvmeu4lmk	NjM3NzlkMjBhNDdlYjE4NmNlY2ZjNmQwZDU1MDJhMWRlNjA2YjYzZTp7Il9hdXRoX3VzZXJfaWQiOiI3IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2M2Y1OWQ4M2E2ZDhlY2U4YzkwYWNjYmM1ZWFhYzBlYzk1ZWNkZjZkIn0=	2018-04-24 18:48:49.880511-04
2xipfncx2djs6b0v21r6jumw6zyklyuq	ZmViNGM2M2Y1NzFkOTFjZGQ1YTUyOTkwYjViNzZiMGQ5NDA5ZGMyNjp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2NjAxYTMxMjQ5MjY3NjBhNGEzZDUwYWI4YjcxNGY1NDJiYTdjOTFlIn0=	2018-04-24 18:50:50.277624-04
npbgty1c5f0bqmicezaus7zqqet7t9ux	NjExMzBiYTk2YWEzZjc5ZmZiMGY0YjkzNzU2MzgyMGExN2E5MzY4Njp7Il9hdXRoX3VzZXJfaWQiOiI2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5ZDFhNDg5ZjhlYjNhMTdkNDljMDNlYmNiMGM5MjIzMWU5Nzg2NGMwIn0=	2018-04-24 18:50:54.142082-04
migrb7hwycygvbkdc9ci7m8v1cw16dr2	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-24 18:53:14.939437-04
wfy53gpdmbyc27w22wefqbhqnlyb0yec	NjM3NzlkMjBhNDdlYjE4NmNlY2ZjNmQwZDU1MDJhMWRlNjA2YjYzZTp7Il9hdXRoX3VzZXJfaWQiOiI3IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2M2Y1OWQ4M2E2ZDhlY2U4YzkwYWNjYmM1ZWFhYzBlYzk1ZWNkZjZkIn0=	2018-04-24 18:53:36.296446-04
kpjgjyq09hs9m5y0fddxqzrtl2tm6y2n	NjExMzBiYTk2YWEzZjc5ZmZiMGY0YjkzNzU2MzgyMGExN2E5MzY4Njp7Il9hdXRoX3VzZXJfaWQiOiI2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5ZDFhNDg5ZjhlYjNhMTdkNDljMDNlYmNiMGM5MjIzMWU5Nzg2NGMwIn0=	2018-04-24 18:54:22.730169-04
z43lce15frgfvh2nidcwrefjbdns7etg	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-24 18:54:27.890789-04
j9de17h7av0az02xzs36oys4b3gqkw5d	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-24 18:54:43.979107-04
he6ldkesrsdp1qebdd3ehsv73lcuis19	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-24 18:54:48.10237-04
1ryy6ou3af0x7p5ny11eq6ilygbqftpn	NjM3NzlkMjBhNDdlYjE4NmNlY2ZjNmQwZDU1MDJhMWRlNjA2YjYzZTp7Il9hdXRoX3VzZXJfaWQiOiI3IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2M2Y1OWQ4M2E2ZDhlY2U4YzkwYWNjYmM1ZWFhYzBlYzk1ZWNkZjZkIn0=	2018-04-24 18:55:11.520731-04
hny8j4dyc5gey6mr7u7w3vwnkcx1a77g	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-24 18:55:22.090816-04
88gaskv6q3ed4lljkq7rgwwc1537j0xa	ZmViNGM2M2Y1NzFkOTFjZGQ1YTUyOTkwYjViNzZiMGQ5NDA5ZGMyNjp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2NjAxYTMxMjQ5MjY3NjBhNGEzZDUwYWI4YjcxNGY1NDJiYTdjOTFlIn0=	2018-04-24 18:55:43.953747-04
eayyerroktkmzesw80jdcnoqu9dm22hj	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-24 18:59:10.29212-04
6bv0rah6rru7y1e7uvahqmahra8dubg7	NjM3NzlkMjBhNDdlYjE4NmNlY2ZjNmQwZDU1MDJhMWRlNjA2YjYzZTp7Il9hdXRoX3VzZXJfaWQiOiI3IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2M2Y1OWQ4M2E2ZDhlY2U4YzkwYWNjYmM1ZWFhYzBlYzk1ZWNkZjZkIn0=	2018-04-24 18:59:31.782186-04
hcc2fog788zs293u4ogt3py78dpibvwj	MTZiYzRjZmM2NTdiMDAwNTY3N2UxMGRiMzI0NTMwMzFiM2U0MjY0Yjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjNjODYwYzc3NzNiMTRiNzc4YzUwNWIxN2QwMjc5MDk2MzEwODVjIn0=	2018-04-24 19:00:40.307141-04
pl3rabx7x0deuq73o3w0myl7hca3882u	NjM3NzlkMjBhNDdlYjE4NmNlY2ZjNmQwZDU1MDJhMWRlNjA2YjYzZTp7Il9hdXRoX3VzZXJfaWQiOiI3IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2M2Y1OWQ4M2E2ZDhlY2U4YzkwYWNjYmM1ZWFhYzBlYzk1ZWNkZjZkIn0=	2018-04-24 19:00:58.540766-04
8jl1ygbsydsxx3g0bym3n578qh4bxkxy	NTMwZWExNWZkMGM2MDE3YWFkYzg1MTRiYzZiMWYwZTdjMzdiYTBmNjp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlOGU0MjI1MGIxZWM5YzFmYTkyNzQ3ODI2MzIyMDFmYzJmMTdlMmQwIn0=	2018-04-24 19:01:44.18066-04
\.


--
-- Data for Name: django_site; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_site (id, domain, name) FROM stdin;
1	example.com	example.com
\.


--
-- Name: django_site_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_site_id_seq', 1, true);


--
-- Data for Name: docente_asignatura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.docente_asignatura (id, aula, horario_dia, horario_hora, asignatura_id, docente_id, periodo_id) FROM stdin;
1	1	0	08:00 - 10:00	7	1	1
2	1	2	08:00 - 10:00	7	1	1
3	2	1	13:00 - 15:00	1	5	1
4	3	1	13:00 - 15:00	1	5	1
5	4	2	11:00 - 13:00	4	4	1
6	4	4	11:00 - 13:00	4	4	1
7	7	1	07:00 - 09:00	9	3	1
8	7	3	07:00 - 09:00	9	3	1
9	2	0	08:00 - 10:00	8	3	2
10	3	2	12:00 - 14:00	8	5	2
11	8	1	13:00 - 15:00	1	4	2
12	8	3	13:00 - 15:00	1	4	2
13	4	0	10:00 - 12:00	1	5	3
14	4	2	10:00 - 12:00	1	5	3
15	1	1	10:00 - 12:00	12	3	3
16	2	3	10:00 - 12:00	12	3	3
17	2	0	13:00 - 15:00	5	4	3
18	1	2	13:00 - 15:00	5	4	3
\.


--
-- Data for Name: estado_estudiante; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estado_estudiante (id, estado) FROM stdin;
1	activo
2	reincorporado
3	retirado
4	reingresado
\.


--
-- Data for Name: estado_periodo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estado_periodo (id, estado) FROM stdin;
1	activo
2	en inscripcion
3	finalizado
4	no iniciado
\.


--
-- Data for Name: estado_tramite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estado_tramite (id, estado) FROM stdin;
\.


--
-- Data for Name: estudiante; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estudiante (usuario_id, direccion, id_estado_estudiante_id, id_tipo_postgrado_id) FROM stdin;
2	chuao	1	1
7	lpg	1	2
8	chuao	1	3
\.


--
-- Data for Name: estudiante_asignatura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estudiante_asignatura (id, nota_definitiva, asignatura_id, periodo_estudiante_id, retirado) FROM stdin;
29	0	1	11	t
27	20	7	11	f
28	17	4	11	f
31	0	1	12	f
30	15	8	12	f
34	20	5	13	f
35	0	1	13	t
\.


--
-- Data for Name: estudiante_tramite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estudiante_tramite (id, fecha_creacion, fecha_tope, mensaje, estado_tramite_id, estudiante_id, tramite_id) FROM stdin;
\.


--
-- Data for Name: periodo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.periodo (id, estado_periodo_id, tipo_postgrado_id, descripcion) FROM stdin;
1	3	1	I-2017
2	1	1	II-2017
3	3	2	I-2018
\.


--
-- Name: periodo_estadoperiodo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.periodo_estadoperiodo_id_seq', 4, true);


--
-- Data for Name: periodo_estudiante; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.periodo_estudiante (id, pagado, estudiante_id, periodo_id) FROM stdin;
11	t	2	1
12	t	2	2
13	t	7	3
\.


--
-- Name: periodo_periodo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.periodo_periodo_id_seq', 3, true);


--
-- Data for Name: personal_administrativo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personal_administrativo (usuario_id) FROM stdin;
6
\.


--
-- Data for Name: personal_docente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personal_docente (usuario_id, direccion, rif, curriculum, permiso_ingresos, coordinador) FROM stdin;
1	Los palos grandes				t
3	Chacaito				f
4	Chuao				f
5	los palos grandes				f
\.


--
-- Data for Name: prelacion_asignatura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.prelacion_asignatura (id, asignatura_objetivo_id, asignatura_prela_id) FROM stdin;
1	M002	M001
2	M003	M002
3	D002	M001
4	D002	D001
5	AP02	AP01
6	OE01	AP01
7	OE02	OE01
8	D003	D002
9	D003	M002
10	D003	OE01
11	BD01	M002
12	BD01	AP02
\.


--
-- Name: prelacion_asignatura_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.prelacion_asignatura_id_seq', 12, true);


--
-- Name: relacion_asignaturatipopostgrado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.relacion_asignaturatipopostgrado_id_seq', 1, false);


--
-- Name: relacion_docenteasignatura_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.relacion_docenteasignatura_id_seq', 18, true);


--
-- Name: relacion_estudianteasignatura_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.relacion_estudianteasignatura_id_seq', 35, true);


--
-- Name: relacion_estudiantetramite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.relacion_estudiantetramite_id_seq', 1, false);


--
-- Name: relacion_periodoestudiante_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.relacion_periodoestudiante_id_seq', 13, true);


--
-- Data for Name: tipo_asignatura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_asignatura (id, nombre) FROM stdin;
1	Obligatoria
2	Electiva
\.


--
-- Data for Name: tipo_postgrado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_postgrado (id, tipo) FROM stdin;
1	Doctorado
2	Especializacion
3	Maestria
\.


--
-- Data for Name: tramite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tramite (id, nombre, descripcion, max_numero_dias) FROM stdin;
\.


--
-- Name: tramite_estadotramite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tramite_estadotramite_id_seq', 1, false);


--
-- Name: tramite_tramite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tramite_tramite_id_seq', 1, false);


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, cedula, segundo_nombre, segundo_apellido, correo_alternativo, celular, telefono_casa, telefono_trabajo, fecha_nacimiento, sexo, nacionalidad, estado_civil, foto) FROM stdin;
6	pbkdf2_sha256$100000$SFrLeLTLMwM9$YCWxvz1CcaAZBSZhgoLK7fWg86h2sAvV3zuZuzl+5Yg=	2018-04-10 18:54:22.716849-04	f	14021452	Sergio	Marquina	smarquina@gmail.com	f	t	2018-04-09 00:05:29.264804-04	14021452	\N	\N		04165458452	02125425639	02125478587	1984-12-01	M	Venezolano	Casado	sisgiu/no_avatar.jpg
5	pbkdf2_sha256$100000$ZjVlk9B5LU46$/Vhli3L8hd9Af+yU4sqx2AetGyg0EziLaHbwqraIoMc=	2018-04-09 21:35:46.700627-04	f	10254585	Tokio	Cruz	tcruz@gmail.com	f	t	2018-04-09 00:04:20.701419-04	10254585	\N	\N		04140256854	02125458562	02125458565	1972-09-14	M	Venezolano	Soltero	sisgiu/no_avatar.jpg
3	pbkdf2_sha256$100000$b4t7fKABNFYI$SFC+56TAr9kn0PYmYyAL+rxFUfGY3VVPdAXq7s/h7nA=	2018-04-09 21:36:23.759392-04	f	12541265	Andres	Fonollosa	afonollosa@gmail.com	f	t	2018-04-09 00:02:14.815203-04	12541265	\N	\N		04125459685	02123657485	02125487485	1980-06-20	M	Venezolano	Casado	sisgiu/no_avatar.jpg
8	pbkdf2_sha256$100000$QyRKpj2kjSfc$ppRqPrhCEPZXDDPRP7a4jQ16Bci56Ko+zt2GGw5/jNA=	\N	f	13454526	Helsinski	Petronov	helsinki@gmail.com	f	t	2018-04-09 21:50:02.183889-04	13454526	\N	Cachicoff		04140215485	02125458758	04125458452	1975-02-02	M	Venezolano	Casado	sisgiu/no_avatar.jpg
4	pbkdf2_sha256$100000$MoSvflp796YL$bDBgTIRowAEV9g60lPoG0jHQVSRY9cb2SoprRl1/5Bc=	2018-04-10 18:55:43.92229-04	f	6525458	Mariana	Valdron	avaldron@gmail.com	f	t	2018-04-09 00:03:09.074984-04	6525458	\N	\N		04141256358	02125458965		1965-06-12	M	Venezolano	Viudo	sisgiu/no_avatar.jpg
7	pbkdf2_sha256$100000$6EYSsGHP3jGx$M6aA1Q5G5swhtTqcyB1Z+LE6qBrcJZ2yNKrpx9y2iFU=	2018-04-10 19:00:58.518193-04	f	15263745	Rio	Martinez	rio@gmail.com	f	t	2018-04-09 21:47:09.609722-04	15263745	\N	Mendoza					1994-12-12	M	Venezolano	Soltero	sisgiu/no_avatar.jpg
2	pbkdf2_sha256$100000$GzB5UWBdZNWC$dbvpOo8PQcW91w7VO9pK7I5E9FG64aSdXTXgohpUnU8=	2018-04-10 19:01:44.164489-04	f	24635906	Tomas	Rincon	tomas@gmail.com	f	t	2018-04-08 22:28:26.315588-04	24635906	Jose	Fernandez		04142545896	02125698587		1994-11-12	M	Venezolano	Soltero	user_24635906/52645.jpg
1	pbkdf2_sha256$100000$uZxi5YGXhOTI$LX0dLgLX06RhE5L2ISd4WeiYVo727cmucsmVYaaAoTg=	2018-04-10 19:00:40.293611-04	t	24635907	Jose	Castro	josegregorio994@gmail.com	t	t	2018-04-08 21:14:08-04	24635907	Gregorio	Lazo					2018-04-09				user_24635907/foto_green_card_octubre_2017.jpg
\.


--
-- Name: usuario_estadoestudiante_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_estadoestudiante_id_seq', 4, true);


--
-- Data for Name: usuario_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario_groups (id, usuario_id, group_id) FROM stdin;
\.


--
-- Name: usuario_tipopostgrado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_tipopostgrado_id_seq', 3, true);


--
-- Data for Name: usuario_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario_user_permissions (id, usuario_id, permission_id) FROM stdin;
\.


--
-- Name: usuario_usuario_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_usuario_groups_id_seq', 1, false);


--
-- Name: usuario_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_usuario_id_seq', 8, true);


--
-- Name: usuario_usuario_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_usuario_user_permissions_id_seq', 1, false);


--
-- Name: account_emailaddress_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_email_key UNIQUE (email);


--
-- Name: account_emailaddress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_pkey PRIMARY KEY (id);


--
-- Name: account_emailconfirmation_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirmation_key_key UNIQUE (key);


--
-- Name: account_emailconfirmation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirmation_pkey PRIMARY KEY (id);


--
-- Name: asignatura_asignatura_codigo_d97fce46_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignatura
    ADD CONSTRAINT asignatura_asignatura_codigo_d97fce46_uniq UNIQUE (codigo);


--
-- Name: asignatura_asignatura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignatura
    ADD CONSTRAINT asignatura_asignatura_pkey PRIMARY KEY (id);


--
-- Name: asignatura_tipoasignatura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_asignatura
    ADD CONSTRAINT asignatura_tipoasignatura_pkey PRIMARY KEY (id);


--
-- Name: auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: django_site_domain_a2e37b91_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_domain_a2e37b91_uniq UNIQUE (domain);


--
-- Name: django_site_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_pkey PRIMARY KEY (id);


--
-- Name: periodo_estadoperiodo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_periodo
    ADD CONSTRAINT periodo_estadoperiodo_pkey PRIMARY KEY (id);


--
-- Name: periodo_periodo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodo
    ADD CONSTRAINT periodo_periodo_pkey PRIMARY KEY (id);


--
-- Name: prelacion_asignatura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prelacion_asignatura
    ADD CONSTRAINT prelacion_asignatura_pkey PRIMARY KEY (id);


--
-- Name: relacion_asignaturatipopostgrado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."asignatura_tipoPostgrado"
    ADD CONSTRAINT relacion_asignaturatipopostgrado_pkey PRIMARY KEY (id);


--
-- Name: relacion_docenteasignatura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.docente_asignatura
    ADD CONSTRAINT relacion_docenteasignatura_pkey PRIMARY KEY (id);


--
-- Name: relacion_estudianteasignatura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante_asignatura
    ADD CONSTRAINT relacion_estudianteasignatura_pkey PRIMARY KEY (id);


--
-- Name: relacion_estudiantetramite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante_tramite
    ADD CONSTRAINT relacion_estudiantetramite_pkey PRIMARY KEY (id);


--
-- Name: relacion_periodoestudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodo_estudiante
    ADD CONSTRAINT relacion_periodoestudiante_pkey PRIMARY KEY (id);


--
-- Name: tramite_estadotramite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_tramite
    ADD CONSTRAINT tramite_estadotramite_pkey PRIMARY KEY (id);


--
-- Name: tramite_tramite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tramite
    ADD CONSTRAINT tramite_tramite_pkey PRIMARY KEY (id);


--
-- Name: usuario_estadoestudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_estudiante
    ADD CONSTRAINT usuario_estadoestudiante_pkey PRIMARY KEY (id);


--
-- Name: usuario_estudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT usuario_estudiante_pkey PRIMARY KEY (usuario_id);


--
-- Name: usuario_personaladministrativo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_administrativo
    ADD CONSTRAINT usuario_personaladministrativo_pkey PRIMARY KEY (usuario_id);


--
-- Name: usuario_personaldocente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_docente
    ADD CONSTRAINT usuario_personaldocente_pkey PRIMARY KEY (usuario_id);


--
-- Name: usuario_tipopostgrado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_postgrado
    ADD CONSTRAINT usuario_tipopostgrado_pkey PRIMARY KEY (id);


--
-- Name: usuario_usuario_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_groups
    ADD CONSTRAINT usuario_usuario_groups_pkey PRIMARY KEY (id);


--
-- Name: usuario_usuario_groups_usuario_id_group_id_a4cfb0b8_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_groups
    ADD CONSTRAINT usuario_usuario_groups_usuario_id_group_id_a4cfb0b8_uniq UNIQUE (usuario_id, group_id);


--
-- Name: usuario_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_usuario_pkey PRIMARY KEY (id);


--
-- Name: usuario_usuario_user_per_usuario_id_permission_id_c0a85055_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_user_permissions
    ADD CONSTRAINT usuario_usuario_user_per_usuario_id_permission_id_c0a85055_uniq UNIQUE (usuario_id, permission_id);


--
-- Name: usuario_usuario_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_user_permissions
    ADD CONSTRAINT usuario_usuario_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: usuario_usuario_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_usuario_username_key UNIQUE (username);


--
-- Name: account_emailaddress_email_03be32b2_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX account_emailaddress_email_03be32b2_like ON public.account_emailaddress USING btree (email varchar_pattern_ops);


--
-- Name: account_emailaddress_user_id_2c513194; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX account_emailaddress_user_id_2c513194 ON public.account_emailaddress USING btree (user_id);


--
-- Name: account_emailconfirmation_email_address_id_5b7f8c58; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX account_emailconfirmation_email_address_id_5b7f8c58 ON public.account_emailconfirmation USING btree (email_address_id);


--
-- Name: account_emailconfirmation_key_f43612bd_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX account_emailconfirmation_key_f43612bd_like ON public.account_emailconfirmation USING btree (key varchar_pattern_ops);


--
-- Name: asignatura_asignatura_codigo_d97fce46_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX asignatura_asignatura_codigo_d97fce46_like ON public.asignatura USING btree (codigo varchar_pattern_ops);


--
-- Name: asignatura_asignatura_tipo_asignatura_id_025526cc; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX asignatura_asignatura_tipo_asignatura_id_025526cc ON public.asignatura USING btree (tipo_asignatura_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: django_site_domain_a2e37b91_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_site_domain_a2e37b91_like ON public.django_site USING btree (domain varchar_pattern_ops);


--
-- Name: periodo_periodo_estado_periodo_id_54d3892f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX periodo_periodo_estado_periodo_id_54d3892f ON public.periodo USING btree (estado_periodo_id);


--
-- Name: periodo_periodo_tipo_postgrado_id_7d8aceec; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX periodo_periodo_tipo_postgrado_id_7d8aceec ON public.periodo USING btree (tipo_postgrado_id);


--
-- Name: prelacion_asignatura_asignatura_objetivo_id_d08e0fcf; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX prelacion_asignatura_asignatura_objetivo_id_d08e0fcf ON public.prelacion_asignatura USING btree (asignatura_objetivo_id);


--
-- Name: prelacion_asignatura_asignatura_prela_id_c13f3daf; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX prelacion_asignatura_asignatura_prela_id_c13f3daf ON public.prelacion_asignatura USING btree (asignatura_prela_id);


--
-- Name: relacion_asignaturatipopostgrado_asignatura_id_b2429aff; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relacion_asignaturatipopostgrado_asignatura_id_b2429aff ON public."asignatura_tipoPostgrado" USING btree (asignatura_id);


--
-- Name: relacion_asignaturatipopostgrado_tipo_postgrado_id_0ed1e7fb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relacion_asignaturatipopostgrado_tipo_postgrado_id_0ed1e7fb ON public."asignatura_tipoPostgrado" USING btree (tipo_postgrado_id);


--
-- Name: relacion_docenteasignatura_asignatura_id_a30d4b99; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relacion_docenteasignatura_asignatura_id_a30d4b99 ON public.docente_asignatura USING btree (asignatura_id);


--
-- Name: relacion_docenteasignatura_docente_id_df3f74f5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relacion_docenteasignatura_docente_id_df3f74f5 ON public.docente_asignatura USING btree (docente_id);


--
-- Name: relacion_docenteasignatura_periodo_id_a10e5bb8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relacion_docenteasignatura_periodo_id_a10e5bb8 ON public.docente_asignatura USING btree (periodo_id);


--
-- Name: relacion_estudianteasignatura_asignatura_id_9fa95463; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relacion_estudianteasignatura_asignatura_id_9fa95463 ON public.estudiante_asignatura USING btree (asignatura_id);


--
-- Name: relacion_estudianteasignatura_periodo_estudiante_id_a39cc875; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relacion_estudianteasignatura_periodo_estudiante_id_a39cc875 ON public.estudiante_asignatura USING btree (periodo_estudiante_id);


--
-- Name: relacion_estudiantetramite_estado_tramite_id_7ccf1fde; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relacion_estudiantetramite_estado_tramite_id_7ccf1fde ON public.estudiante_tramite USING btree (estado_tramite_id);


--
-- Name: relacion_estudiantetramite_estudiante_id_b505b528; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relacion_estudiantetramite_estudiante_id_b505b528 ON public.estudiante_tramite USING btree (estudiante_id);


--
-- Name: relacion_estudiantetramite_tramite_id_2561bd6d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relacion_estudiantetramite_tramite_id_2561bd6d ON public.estudiante_tramite USING btree (tramite_id);


--
-- Name: relacion_periodoestudiante_estudiante_id_d33c10d7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relacion_periodoestudiante_estudiante_id_d33c10d7 ON public.periodo_estudiante USING btree (estudiante_id);


--
-- Name: relacion_periodoestudiante_periodo_id_26703495; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX relacion_periodoestudiante_periodo_id_26703495 ON public.periodo_estudiante USING btree (periodo_id);


--
-- Name: usuario_estudiante_id_estado_estudiante_id_0f9b1079; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX usuario_estudiante_id_estado_estudiante_id_0f9b1079 ON public.estudiante USING btree (id_estado_estudiante_id);


--
-- Name: usuario_estudiante_id_tipo_postgrado_id_44693349; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX usuario_estudiante_id_tipo_postgrado_id_44693349 ON public.estudiante USING btree (id_tipo_postgrado_id);


--
-- Name: usuario_usuario_groups_group_id_b9c090f8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX usuario_usuario_groups_group_id_b9c090f8 ON public.usuario_groups USING btree (group_id);


--
-- Name: usuario_usuario_groups_usuario_id_62de76a1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX usuario_usuario_groups_usuario_id_62de76a1 ON public.usuario_groups USING btree (usuario_id);


--
-- Name: usuario_usuario_user_permissions_permission_id_5cad0a4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX usuario_usuario_user_permissions_permission_id_5cad0a4b ON public.usuario_user_permissions USING btree (permission_id);


--
-- Name: usuario_usuario_user_permissions_usuario_id_5969a193; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX usuario_usuario_user_permissions_usuario_id_5969a193 ON public.usuario_user_permissions USING btree (usuario_id);


--
-- Name: usuario_usuario_username_9e5f6fb3_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX usuario_usuario_username_9e5f6fb3_like ON public.usuario USING btree (username varchar_pattern_ops);


--
-- Name: account_emailaddress_user_id_2c513194_fk_usuario_usuario_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_user_id_2c513194_fk_usuario_usuario_id FOREIGN KEY (user_id) REFERENCES public.usuario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_emailconfirmation_email_address_id_5b7f8c58_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirmation_email_address_id_5b7f8c58_fk FOREIGN KEY (email_address_id) REFERENCES public.account_emailaddress(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: asignatura_asignatur_tipo_asignatura_id_025526cc_fk_asignatur; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignatura
    ADD CONSTRAINT asignatura_asignatur_tipo_asignatura_id_025526cc_fk_asignatur FOREIGN KEY (tipo_asignatura_id) REFERENCES public.tipo_asignatura(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log_user_id_c564eba6_fk_usuario_usuario_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_usuario_usuario_id FOREIGN KEY (user_id) REFERENCES public.usuario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: periodo_periodo_estado_periodo_id_54d3892f_fk_periodo_e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodo
    ADD CONSTRAINT periodo_periodo_estado_periodo_id_54d3892f_fk_periodo_e FOREIGN KEY (estado_periodo_id) REFERENCES public.estado_periodo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: periodo_periodo_tipo_postgrado_id_7d8aceec_fk_usuario_t; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodo
    ADD CONSTRAINT periodo_periodo_tipo_postgrado_id_7d8aceec_fk_usuario_t FOREIGN KEY (tipo_postgrado_id) REFERENCES public.tipo_postgrado(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: prelacion_asignatura_asignatura_objetivo__d08e0fcf_fk_asignatur; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prelacion_asignatura
    ADD CONSTRAINT prelacion_asignatura_asignatura_objetivo__d08e0fcf_fk_asignatur FOREIGN KEY (asignatura_objetivo_id) REFERENCES public.asignatura(codigo) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: prelacion_asignatura_asignatura_prela_id_c13f3daf_fk_asignatur; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prelacion_asignatura
    ADD CONSTRAINT prelacion_asignatura_asignatura_prela_id_c13f3daf_fk_asignatur FOREIGN KEY (asignatura_prela_id) REFERENCES public.asignatura(codigo) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: relacion_asignaturat_asignatura_id_b2429aff_fk_asignatur; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."asignatura_tipoPostgrado"
    ADD CONSTRAINT relacion_asignaturat_asignatura_id_b2429aff_fk_asignatur FOREIGN KEY (asignatura_id) REFERENCES public.asignatura(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: relacion_asignaturat_tipo_postgrado_id_0ed1e7fb_fk_usuario_t; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."asignatura_tipoPostgrado"
    ADD CONSTRAINT relacion_asignaturat_tipo_postgrado_id_0ed1e7fb_fk_usuario_t FOREIGN KEY (tipo_postgrado_id) REFERENCES public.tipo_postgrado(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: relacion_docenteasig_asignatura_id_a30d4b99_fk_asignatur; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.docente_asignatura
    ADD CONSTRAINT relacion_docenteasig_asignatura_id_a30d4b99_fk_asignatur FOREIGN KEY (asignatura_id) REFERENCES public.asignatura(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: relacion_docenteasig_docente_id_df3f74f5_fk_usuario_p; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.docente_asignatura
    ADD CONSTRAINT relacion_docenteasig_docente_id_df3f74f5_fk_usuario_p FOREIGN KEY (docente_id) REFERENCES public.personal_docente(usuario_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: relacion_docenteasignatura_periodo_id_a10e5bb8_fk_periodo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.docente_asignatura
    ADD CONSTRAINT relacion_docenteasignatura_periodo_id_a10e5bb8_fk_periodo_id FOREIGN KEY (periodo_id) REFERENCES public.periodo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: relacion_estudiantea_asignatura_id_9fa95463_fk_asignatur; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante_asignatura
    ADD CONSTRAINT relacion_estudiantea_asignatura_id_9fa95463_fk_asignatur FOREIGN KEY (asignatura_id) REFERENCES public.asignatura(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: relacion_estudiantea_periodo_estudiante_i_a39cc875_fk_relacion_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante_asignatura
    ADD CONSTRAINT relacion_estudiantea_periodo_estudiante_i_a39cc875_fk_relacion_ FOREIGN KEY (periodo_estudiante_id) REFERENCES public.periodo_estudiante(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: relacion_estudiantet_estado_tramite_id_7ccf1fde_fk_tramite_e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante_tramite
    ADD CONSTRAINT relacion_estudiantet_estado_tramite_id_7ccf1fde_fk_tramite_e FOREIGN KEY (estado_tramite_id) REFERENCES public.estado_tramite(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: relacion_estudiantet_estudiante_id_b505b528_fk_usuario_e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante_tramite
    ADD CONSTRAINT relacion_estudiantet_estudiante_id_b505b528_fk_usuario_e FOREIGN KEY (estudiante_id) REFERENCES public.estudiante(usuario_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: relacion_estudiantet_tramite_id_2561bd6d_fk_tramite_t; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante_tramite
    ADD CONSTRAINT relacion_estudiantet_tramite_id_2561bd6d_fk_tramite_t FOREIGN KEY (tramite_id) REFERENCES public.tramite(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: relacion_periodoestu_estudiante_id_d33c10d7_fk_usuario_e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodo_estudiante
    ADD CONSTRAINT relacion_periodoestu_estudiante_id_d33c10d7_fk_usuario_e FOREIGN KEY (estudiante_id) REFERENCES public.estudiante(usuario_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: relacion_periodoestudiante_periodo_id_26703495_fk_periodo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodo_estudiante
    ADD CONSTRAINT relacion_periodoestudiante_periodo_id_26703495_fk_periodo_id FOREIGN KEY (periodo_id) REFERENCES public.periodo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: usuario_estudiante_id_estado_estudiante_0f9b1079_fk_usuario_e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT usuario_estudiante_id_estado_estudiante_0f9b1079_fk_usuario_e FOREIGN KEY (id_estado_estudiante_id) REFERENCES public.estado_estudiante(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: usuario_estudiante_id_tipo_postgrado_id_44693349_fk_usuario_t; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT usuario_estudiante_id_tipo_postgrado_id_44693349_fk_usuario_t FOREIGN KEY (id_tipo_postgrado_id) REFERENCES public.tipo_postgrado(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: usuario_estudiante_usuario_id_0a4baa44_fk_usuario_usuario_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT usuario_estudiante_usuario_id_0a4baa44_fk_usuario_usuario_id FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: usuario_personaladmi_usuario_id_e71fd3a5_fk_usuario_u; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_administrativo
    ADD CONSTRAINT usuario_personaladmi_usuario_id_e71fd3a5_fk_usuario_u FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: usuario_personaldoce_usuario_id_e506feb6_fk_usuario_u; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_docente
    ADD CONSTRAINT usuario_personaldoce_usuario_id_e506feb6_fk_usuario_u FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: usuario_usuario_grou_usuario_id_62de76a1_fk_usuario_u; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_groups
    ADD CONSTRAINT usuario_usuario_grou_usuario_id_62de76a1_fk_usuario_u FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: usuario_usuario_groups_group_id_b9c090f8_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_groups
    ADD CONSTRAINT usuario_usuario_groups_group_id_b9c090f8_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: usuario_usuario_user_permission_id_5cad0a4b_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_user_permissions
    ADD CONSTRAINT usuario_usuario_user_permission_id_5cad0a4b_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: usuario_usuario_user_usuario_id_5969a193_fk_usuario_u; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario_user_permissions
    ADD CONSTRAINT usuario_usuario_user_usuario_id_5969a193_fk_usuario_u FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

