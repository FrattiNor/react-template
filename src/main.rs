use rpassword;
use std::io;
use std::process;

fn stand_by() {
    println!("按任意键退出...");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("读取失败");
    process::exit(0);
}

fn username_input() -> String {
    let mut input = String::new();
    println!("用户名:");
    io::stdin().read_line(&mut input).expect("读取失败");
    while input.trim() == "" {
        println!("ERR:用户名为空!");
        println!("用户名:");
        io::stdin().read_line(&mut input).expect("读取失败");
    }
    input.trim().to_string()
}

fn password_input() -> String {
    println!("密码:");
    let password = rpassword::read_password().expect("读取失败");
    password.trim().to_string()
}

fn year_input() -> String {
    println!("查询年份（默认当年）:");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("读取失败");
    input.trim().to_string()
}

fn month_input() -> String {
    println!("查询月份（默认当月）:");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("读取失败");
    input.trim().to_string()
}

fn main() {
    let username = username_input();

    let password = password_input();

    let year = year_input();

    let month = month_input();

    println!(
        "{}, {}, {}, {}",
        username.trim(),
        password.trim(),
        year.trim(),
        month.trim()
    );

    stand_by();
}
