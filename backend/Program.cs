var builder = WebApplication.CreateBuilder(args);

// --- CONFIGURACIÓN DE SERVICIOS ---

// Soporte para Controladores y documentación Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Política CORS para permitir peticiones desde React (Vite)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// --- CONFIGURACIÓN DEL PIPELINE DE PETICIONES (MIDDLEWARES) ---

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Activar la política CORS
app.UseCors("AllowReactApp");

// Mapear automáticamente los controladores (busca archivos en /Controllers)
app.MapControllers();

app.Run();