const { NextResponse } = require("next/server");

const msgResponse = (msg) => {
  return NextResponse.json({ message: msg});
};

const successResponse = (data) => {
  return NextResponse.json(data, { status: 200 });
};

export { msgResponse, successResponse };
