const { NextResponse } = require("next/server");

const errorHandler = (msg) => {
  return NextResponse.json(
    { error: msg || "Internal server error" },
    { status: 202 }
  );
};

export default errorHandler;
