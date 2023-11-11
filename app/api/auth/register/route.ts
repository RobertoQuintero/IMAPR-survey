import db from "@/database/connection";
import { User } from "@/interfaces";
import { createJWT } from "../../../../utils";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { name, email, password, phone, address, postal_code } =
    body as User;
  const date = new Date().toISOString();

  try {
    const resp = await db.query(`
      SELECT email FROM Auth.Users WHERE email='${email}'`);

    if (resp.length) {
      return Response.json(
        {
          ok: false,
          data: "Ya hay un usuario con ese email",
        },
        {
          status: 400,
        }
      );
    }

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password!, salt);
    

    const res = (await db.query(`
    DECLARE @const int 
      SET @const=(SELECT isNull(max(id_user),0)+1  FROM Auth.Users)
    INSERT Auth.Users (
      id_user,
      name,
      email,
      password,
      status,
      id_role,
      phone,
      address,
      postal_code,
      image_url,
      created_at,
      updated_at
    )
    VALUES (
      @const,
      '${name}',
      '${email}',
      '${passwordHash}',
      'true',
      '3',
      '${phone}',
      '${address}',
      '${postal_code}',
      'https://res.cloudinary.com/dmq9e2wuv/image/upload/v1697061904/belisario/ln1uxluznhfhzbxfoa8z.png',
      '${date}',
      '${date}'
    )
    SELECT * FROM Auth.Users WHERE id_user=@const;
    `)) as unknown;

    const token = await createJWT((res as User[])[0].id_role, email);
    const user = (res as User[]).map((user) => {
      const {
        password,
        created_at,
        updated_at,
        status,
        ...rest
      } = user;
      return rest;
    });

    return Response.json(
      {
        ok: true,
        data: user[0],
      },
      {
        status: 201,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "Set-Cookie": `jwt=${token}; Max-Age=8640; Path=/`,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        ok: false,
        data: "Error en el servidor",
      },
      {
        status: 500,
      }
    );
  }
};
