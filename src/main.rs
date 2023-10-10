use std::io;
use std::process;

fn stand_by() {
    println!("按任意键退出...");

    let mut input = String::new();

    io::stdin().read_line(&mut input).expect("读取失败");

    process::exit(0);
}

fn stand_by2() {
    println!("按任意键退出...");

    let mut input = String::new();

    io::stdin().read_line(&mut input).expect("读取失败");

    process::exit(0);
}

fn main() {
    print!("输入文本");

    let mut input = String::new();

    io::stdin().read_line(&mut input).expect("读取失败");

    println!("输入是:{}", input);

    stand_by();
}
