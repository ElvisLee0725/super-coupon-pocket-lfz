--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_pkey;
ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
ALTER TABLE public.coupons ALTER COLUMN coupon_id DROP DEFAULT;
ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
DROP SEQUENCE public.users_user_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.coupons_coupon_id_seq;
DROP TABLE public.coupons;
DROP SEQUENCE public.categories_category_id_seq;
DROP TABLE public.categories;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category character varying(255) NOT NULL
);


--
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- Name: coupons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.coupons (
    coupon_id integer NOT NULL,
    user_id integer NOT NULL,
    merchant character varying(255) NOT NULL,
    discount character varying(255) NOT NULL,
    category_id integer NOT NULL,
    expiration_date character varying(255),
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    used boolean DEFAULT false NOT NULL
);


--
-- Name: coupons_coupon_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.coupons_coupon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: coupons_coupon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.coupons_coupon_id_seq OWNED BY public.coupons.coupon_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    avatar_url character varying(255)
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- Name: coupons coupon_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coupons ALTER COLUMN coupon_id SET DEFAULT nextval('public.coupons_coupon_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (category_id, category) FROM stdin;
1	restaurant
2	travel
4	entertainment
5	other
\.


--
-- Data for Name: coupons; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.coupons (coupon_id, user_id, merchant, discount, category_id, expiration_date, created_at, used) FROM stdin;
3	4	AMC	1 free large drink	4	\N	2020-06-17 04:48:10.211285+00	f
39	3	Marriott	1 free night up to 35K	2	2021-01-31T20:00:00.000Z	2020-07-05 22:50:50.093706+00	f
40	3	Hyatt	1 free night up to category 4	2	2021-01-01T20:00:00.000Z	2020-07-05 22:58:22.863846+00	f
41	3	Ruth's Chris Steak House	$25 off with any entree purchase	1	2020-11-30T20:00:00.000Z	2020-07-05 23:16:15.650156+00	f
35	3	AMC	1 free large popcorn and beverage	4	2020-07-31T19:00:00.000Z	2020-07-03 18:58:53.290689+00	f
44	3	Pusheen Shop	1 free 9" boba Pusheen	5	2020-07-04T19:00:00.000Z	2020-07-05 23:49:29.229056+00	f
37	3	Calvin Klein	20% off birthday coupon	5	2020-07-31T19:00:00.000Z	2020-07-05 20:43:35.302883+00	f
38	3	Peet's 	1 free beverage any size	1	2020-08-31T19:00:00.000Z	2020-07-05 20:47:53.615886+00	f
31	3	Shell	Use app pay with PayPal $3 off 	5	2020-07-31T19:00:00.000Z	2020-07-03 18:14:19.189666+00	f
42	3	Boiling Point	$10 off with meal order	1	2020-07-20T19:00:00.000Z	2020-07-05 23:22:20.768589+00	t
36	3	Cheesecake Factory	$20 lunch special	1	2020-07-03T18:59:20.214Z	2020-07-03 18:59:59.307816+00	t
34	3	IHG	1 free night up to 40,000 points	2	2020-08-31T19:00:00.000Z	2020-07-03 18:57:19.561076+00	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, name, email, password, created_at, avatar_url) FROM stdin;
3	Elvis Lee	elvislee0725@gmail.com	$2a$10$B74miPPFTn3fAQl/P/2ydOLhFCbQjkY58f1mqTaVkXMikKRE4vN.C	2020-06-14 21:44:45.123988+00	//www.gravatar.com/avatar/aaf2b27e19c09ec4a8173b0c0723e106?s=200&r=pg&d=mm
4	John Doe	test@gmail.com	$2a$10$QauXThKu4m7l7etGfaiit.sKrvbEHIG8SEejfSxZfm2UotSCpuxR2	2020-06-14 22:11:38.577416+00	//www.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=200&r=pg&d=mm
5	Jane Doe	test1@gmail.com	$2a$10$YIgIS9srOZJO5mZ.Qt4kKOzv4B1gQUpYz.Gj/T4T7P2UX2eR5/btC	2020-06-16 01:16:23.193553+00	//www.gravatar.com/avatar/245cf079454dc9a3374a7c076de247cc?s=200&r=pg&d=mm
6	Jimmy McGill	jm@gmail.com	$2a$10$VfBtjtbUgoV2s7zevXwzQ.ewv4a/397JIfloDnozkCg1oj8HLTNC6	2020-06-21 20:06:01.273581+00	//www.gravatar.com/avatar/c898e0d48bd6242ae01e31f303069be5?s=200&r=pg&d=mm
7	John Smith	js@gmail.com	$2a$10$MLB1UDOBmS.6MLpY1muuwOuLMP9vNtGCJWvQQAeBQVn0ZjYGfV4sK	2020-06-22 19:21:48.67922+00	//www.gravatar.com/avatar/38135c60b09c5f5a6cba9e09a5f87205?s=200&r=pg&d=mm
8	Peter Griffin	pg@gmail.com	$2a$10$XIUQhxcCqg7xnpNcTQocCe57SobXg3WocARrY81vXigosEff0XSEm	2020-06-24 05:28:34.141608+00	//www.gravatar.com/avatar/7f228a94311694b72824466a46c971ad?s=200&r=pg&d=mm
9	Walter White	ww@gmail.com	$2a$10$ytlJMYD1qsXdheUrTDE1ruKUFbGIPDnyBIcf/m.CVDDUQjxLh4rjy	2020-06-24 05:34:34.479347+00	//www.gravatar.com/avatar/854ff0f3a14711a12c795eb9df487117?s=200&r=pg&d=mm
10	Emma Stone	es@gmail.com	$2a$10$EoIB2lEzH2D68IcsOMlvfOR0oblsKbrUys3Uh6MoxmbUApLEaIkcu	2020-06-24 05:44:08.473454+00	//www.gravatar.com/avatar/b9245b28e0753ede8d628a0c079d511f?s=200&r=pg&d=mm
11	Krazy 8	k8@gmail.com	$2a$10$bF/j9g893HP1aNpTJjq5JOC9OOGjEIYkYfTaGDuIgCxnMstT1Wr2i	2020-06-24 05:51:46.601482+00	//www.gravatar.com/avatar/56a18757493e78019d4c4e65a6b716bc?s=200&r=pg&d=mm
12	Luke Skywalker	ls@gmail.com	$2a$10$yIFo/bwWdmWN3y.1MN.cbeTKrECtXVcpPZ5SRf14Fd6vguhYrfwDm	2020-06-24 05:57:56.121143+00	//www.gravatar.com/avatar/27eb5383bc621e9e761d33c4b2a5f7f3?s=200&r=pg&d=mm
\.


--
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 5, true);


--
-- Name: coupons_coupon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.coupons_coupon_id_seq', 48, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 12, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: coupons coupons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (coupon_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

