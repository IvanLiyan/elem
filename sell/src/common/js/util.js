/**
 * Created by Ivan on 2017/3/26.
 */
/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
  let url = window.location.search;  /*通过window.location.search来获取url*/
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;  /* 匹配结果：[?][id]=[12345] 为一个 */
  let arr = url.match(reg);  /*用url.match方法传入正则去匹配，返回一个数组，['?id=12345','&a=b'] */
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => { /*捕获到上个数组后，继续拆分*/
      let tempArr = item.substring(1).split('=');  /*去掉？再通过=号分割成新数组，['id','12345'] */
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;  /*将取到的key和val配到对象Obj中*/
    });
  }
  return obj;
};
