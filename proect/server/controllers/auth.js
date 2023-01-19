import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//// register user

export const register = async (req, res) => {
  try {
    const { username, password } = req.body; //// запрашиваем информацию с фронта о юзере и пароле

    const isUsed = await User.findOne({ username }); //// ищем в базе данных по юзернэйму

    if (isUsed) {
      //// если такой пользователь существует то отправляем сообщение и статус
      return res.json({
        message: "Такой пользователь уже существует!",
      });
    }
    const salt = bcrypt.genSaltSync(10); //// хэшируем пароль
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      //// создаем нового юзера
      username,
      password: hash,
    });

    const token = jwt.sign(
      {
        //// создаем JWT токен для авторизации и шифруем его по id юзера
        id: newUser._id,
      },
      process.env.SECRET, ////секретная фраза
      { expiresIn: "30d" } //// срок действия токкена
    );

    await newUser.save(); //// записываем в БД

    res.json({
      newUser,
      token,
      message: "Регистрация успешна!",
    });
  } catch (error) {
    res.json({
      message: "Ошибка при создании пользователя!",
    });
  }
};

////  login user
export const login = async (req, res) => {
  const { username, password } = req.body; ////запрашиваем информацию с фронта(пароль и юзер)
  const user = await User.findOne({ username }); //// ищем  юзера в базе данных
  if (!user) {
    return res.json({
      message: "Такой пользователь не существует",
    });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password); ////сравниваем пароль который пришел с фронта с паролем в базе данных
  if (!isPasswordCorrect) {
    return res.json({
      message: "Неверный пароль.",
    });
  }

  const token = jwt.sign(
    {
      //// создаем JWT токен для авторизации и шифруем его по id юзера
      id: user._id,
    },
    "efdfdsgfdff6gdfg77fdgdfg", ////секретная фраза
    { expiresIn: "30d" } //// срок действия токкена
  );

  res.json({
    token,
    user,
    message: "Вы вошли в систему!", //// возвращаем на фронт токен юзера и сообщение
  });

  try {
  } catch (error) {
    res.json({
      message: "Ошибка при авторизации.!",
    });
  }
};

//// get me   для постоянного логина, что бы не логиниться при каждом обновлении странички
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId); //// ищем юзера в базе
    if (!user) {
      return res.json({
        message: "Такой пользователь не существует",
      });
    }
    const token = jwt.sign(
      {
        //// создаем JWT токен для авторизации и шифруем его по id юзера
        id: user._id,
      },
      "efdfdsgfdff6gdfg77fdgdfg", ////секретная фраза
      { expiresIn: "30d" } //// срок действия токкена
    );
    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({
      message: "Нет доступа!",
    });
  }
};
