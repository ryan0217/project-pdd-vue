const sendRes = (err, res, data) => {
  if (err) {
    res.json({
      status: 0,
      msg: err.message
    });
  } else {
    res.json({
      status: 1,
      msg: data,
    })
  }
};

const filterUserInfo = (data) => {
  data = JSON.parse(JSON.stringify(data));
  delete data.password;
  delete data.__v;
  return data;
}

module.exports = {
  sendRes,
  filterUserInfo
}