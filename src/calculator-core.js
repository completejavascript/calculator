export function evaluate(arrFormula) {
  const arrPostfix = infix2Postfix(arrFormula);
  return evaluatePostfix(arrPostfix);
}

export function isNotNumber(input) {
  return input === '(' || input === ')' || input === '+' || input === '-' || input === '*' || input === '/' || input === '%';
}

export function isNumber(input) {
  return !isNotNumber(input);
}

export function isOperator(input) {
  return input === '+' || input === '-' || input === '*' || input === '/' || input === '%';
}

export function getPriority(input) {
  if (input === '+' || input === '-') return 1;
  else if (input === '*' || input === '/' || input === '%') return 2;
  return 0;
}

export function infix2Postfix(arrFormula) {
  let result = [], stack = [];

  arrFormula.forEach(item => {
    if (isNumber(item)) {
      result.push(item);
    } else if (item === '(') {
      stack.push(item);
    } else if (item === ')') {
      while (stack.length > 0) {
        const pulledItem = stack.pop();

        if (pulledItem === '(') break;
        else result.push(pulledItem);
      }
    } else if (isOperator(item)) {
      while (stack.length > 0) {
        const peekedItem = stack[stack.length - 1];

        if (isOperator(peekedItem) && getPriority(peekedItem) >= getPriority(item)) {
          result.push(peekedItem);
          stack.pop();
        } else break;
      }

      stack.push(item);
    } else {
      console.log("Something else!!!");
    }
  });

  while (stack.length > 0) {
    result.push(stack.pop());
  }

  return result;
}

/* Ref: https://yinyangit.wordpress.com/2011/01/26/algorithm-chuy%E1%BB%83n-bi%E1%BB%83u-th%E1%BB%A9c-trung-t%E1%BB%91-sang-ti%E1%BB%81n-t%E1%BB%91-va-h%E1%BA%ADu-t%E1%BB%91-b%E1%BA%B1ng-stack/
–       Nếu là toán hạng: cho ra output.

–       Nếu là dấu mở ngoặc “(“: cho vào stack

–       Nếu là dấu đóng ngoặc “)”: lấy các toán tử trong stack ra và cho vào output cho đến khi gặp dấu mở ngoặc “(“. (Dấu mở ngoặc cũng phải được đưa ra khỏi stack)

–       Nếu là toán tử:

Chừng nào ở đỉnh stack là toán tử và toán tử đó có độ ưu tiên lớn hơn hoặc bằng toán tử hiện tại thì lấy toán tử đó ra khỏi stack và cho ra output.
Đưa toán tử hiện tại vào stack
Sau khi duyệt hết biểu thức infix, nếu trong stack còn phần tử thì lấy các token trong đó ra và cho lần lượt vào output.
 */

export function evaluatePostfix(arrPostfix) {
  let stack = [];

  arrPostfix.forEach(item => {
    if (isNumber(item)) {
      stack.push(item);
    } else if (isOperator(item)) {
      const num1 = Number.parseFloat(stack.pop()), num2 = Number.parseFloat(stack.pop());
      let result = '';

      switch (item) {
        case '+':
          result = num2 + num1;
          break;
        case '-':
          result = num2 - num1;
          break;
        case '*':
          result = num2 * num1;
          break;
        case '/':
          result = num2 / num1;
          break;
        case '%':
          result = num2 % num1;
          break;
        default:
          console.log('Something else!!!');
      }

      stack.push(result + '');
    } else {
      console.log("Something else!!!");
    }
  });

  return Number.parseFloat(stack[0]);
}

/* Ref: https://yinyangit.wordpress.com/2011/01/27/algorithm-tinh-gia-tri-bieu-thuc-tien-to-va-hau-to/
Lặp qua các token của của biểu thức postfix từ trái qua phải:

–       Nếu là toán hạng: push vào stack

–       Nếu là toán tử: pop hai toán hạng trong stack ra và tính giá trị của chúng dựa vào toán tử này. Push kết quả đó lại vào stack.

Phần tử còn sót lại trong stack sau vòng lặp chính là kết quả của biểu thức.
*/