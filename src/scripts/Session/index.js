import session from "./session.json";
import utils from "./utils";

let data = {
  session: {},
  parsed: {},
  
};

function loadSession(session) {
  console.log(session);
  data.session = session;
  data.parsed = utils.parseSession(session);
}

loadSession(session);

var xhr = new XMLHttpRequest();
xhr.open("get", "https://sitcon.org/2020/json/session.json");
xhr.onload = function() {
  loadSession(xhr.response);
};
xhr.send();

export default data;
