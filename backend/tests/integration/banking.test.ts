import request from "supertest";
import app from "../../src/app"; 

describe("Banking API Endpoints", () => {
  it("GET /banking/accounts deve retornar 200 com lista", async () => {
    const res = await request(app).get("/banking/accounts");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accounts");
    expect(Array.isArray(res.body.accounts)).toBe(true);
  });

  it("GET /banking/transactions deve retornar 200 com lista", async () => {
    const res = await request(app).get("/banking/transactions");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("transactions");
    expect(Array.isArray(res.body.transactions)).toBe(true);
  });

  it("POST /banking/connect deve retornar 200", async () => {
    const res = await request(app).post("/banking/connect");
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  it("POST /banking/upload deve aceitar arquivo CSV válido", async () => {
    const res = await request(app)
      .post("/banking/upload")
      .attach("file", Buffer.from("col1,col2\n1,2"), "test.csv");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Arquivo recebido com sucesso");
    expect(res.body).toHaveProperty("nome", "test.csv");
  });

  it("POST /banking/upload deve rejeitar arquivo inválido", async () => {
    const res = await request(app)
      .post("/banking/upload")
      .attach("file", Buffer.from("invalid content"), "test.exe");
    expect(res.status).toBe(500); // multer lança erro, pode ser capturado pelo middleware de erro
  });

  it("POST /banking/upload sem arquivo deve retornar 400", async () => {
    const res = await request(app).post("/banking/upload");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Arquivo não enviado");
  });
});
