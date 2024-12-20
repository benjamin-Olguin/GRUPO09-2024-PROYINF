PGDMP  7                
    |           Vigifia    17.0    17.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16388    Vigifia    DATABASE     |   CREATE DATABASE "Vigifia" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Chile.utf8';
    DROP DATABASE "Vigifia";
                     postgres    false            �            1259    16394    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(50)
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �           0    0    TABLE users    ACL     e   GRANT ALL ON TABLE public.users TO vigifia_user;
GRANT ALL ON TABLE public.users TO usuario_vigifia;
          public               postgres    false    218            �            1259    16393    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    218            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217            �           0    0    SEQUENCE users_id_seq    ACL     >   GRANT ALL ON SEQUENCE public.users_id_seq TO usuario_vigifia;
          public               postgres    false    217            X           2604    16397    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �          0    16394    users 
   TABLE DATA           <   COPY public.users (id, username, password, rol) FROM stdin;
    public               postgres    false    218   �       �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public               postgres    false    217            Z           2606    16399    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            �           826    16390    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     �   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO vigifia_user;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO usuario_vigifia;
                        postgres    false            �   �   x�3�LL���3�T1JR14P�tK/s,0
���,H��4.tM�6Os�*��-��3�+��t1�
M�
	0
5(���2�d3(��"׳Կ$"O?�2�,�1$�2�?*=%���ٸ8�1M߱$;�3��,�)?��%�<2bW� c�/�     