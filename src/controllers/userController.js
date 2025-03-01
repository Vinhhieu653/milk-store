const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    // Kiểm tra xem các trường có rỗng không
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Kiểm tra xem email có bị trùng không
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        // Lưu vào cơ sở dữ liệu
        await user.save();

        // Tạo JWT Token (nếu cần)
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            'your-secret-key', // Thay 'your-secret-key' bằng một secret key an toàn
            { expiresIn: '1h' }
        );

        // Trả về phản hồi
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Login successful", token, userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.googleLogin = async (req, res) => {
    const { name, email, googleId } = req.body;

    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        let user = await User.findOne({ email });
        if (!user) {
            // Nếu chưa tồn tại, tạo mới người dùng
            user = new User({ name, email, googleId });
            await user.save();
        }

        // Tạo JWT cho phiên đăng nhập
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, message: 'Đăng Ký Google thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Đăng Ký Google thất bại', error });
    }
};