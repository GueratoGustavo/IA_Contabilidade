from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.platypus import Table, TableStyle
from reportlab.graphics.shapes import Drawing
from reportlab.graphics.charts.barcharts import VerticalBarChart
from reportlab.graphics.charts.legends import Legend
import random
import os

# Frases modelo coerentes e naturais para documentos contábeis/financeiros fictícios
FRASES_MODELO = [
    "Os valores apresentados correspondem às movimentações financeiras do período.",
    "A conciliação bancária foi realizada conforme os documentos anexos.",
    "Despesas operacionais foram classificadas e registradas adequadamente.",
    "Os lançamentos contábeis seguem as normas vigentes de contabilidade.",
    "Receitas foram reconhecidas de acordo com o regime de competência.",
    "Os impostos incidentes foram calculados com base nas alíquotas atuais.",
    "As provisões foram constituídas para garantir a segurança financeira.",
    "A auditoria interna verificou conformidade nos registros apresentados.",
    "Os saldos contábeis refletem fielmente a situação patrimonial.",
    "Foram realizados ajustes para correção de lançamentos anteriores.",
    "Os documentos fiscais foram organizados para futuras consultas.",
    "Os ativos fixos foram avaliados e depreciados conforme política adotada.",
    "Os contratos financeiros foram revisados e validados pela equipe.",
    "Os custos foram detalhados para análise e controle gerencial.",
    "O fluxo de caixa foi projetado para o próximo exercício fiscal.",
    "As obrigações tributárias estão atualizadas e em conformidade legal.",
]


def draw_text(c, x, y, text, max_width=500, line_height=14):
    """Desenha um texto com quebra de linha automática."""
    words = text.split()
    line = ""
    y_pos = y
    for word in words:
        # Tenta adicionar a palavra na linha
        test_line = f"{line} {word}".strip()
        if c.stringWidth(test_line, "Helvetica", 10) < max_width:
            line = test_line
        else:
            c.drawString(x, y_pos, line)
            y_pos -= line_height
            line = word
    if line:
        c.drawString(x, y_pos, line)
    return y_pos


def draw_table(c, x, y, data, col_widths):
    """Desenha uma tabela simples."""
    table = Table(data, colWidths=col_widths)
    style = TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#d3d3d3")),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.black),
            ("FONT", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
        ]
    )
    table.setStyle(style)
    w, h = table.wrapOn(c, 0, 0)
    table.drawOn(c, x, y - h)
    return y - h - 10  # novo y para próximo elemento


def draw_bar_chart(c, x, y):
    """Desenha um gráfico de barras simples."""
    drawing = Drawing(200, 100)
    data = [
        [random.randint(10, 100) for _ in range(5)],
    ]
    bc = VerticalBarChart()
    bc.x = 50
    bc.y = 20
    bc.height = 60
    bc.width = 100
    bc.data = data
    bc.barWidth = 15
    bc.groupSpacing = 10
    bc.barSpacing = 3
    bc.valueAxis.valueMin = 0
    bc.valueAxis.valueMax = 120
    bc.valueAxis.valueStep = 20
    bc.categoryAxis.categoryNames = ["Jan", "Feb", "Mar", "Apr", "May"]
    drawing.add(bc)

    # Legenda
    legend = Legend()
    legend.x = 160
    legend.y = 60
    legend.dx = 8
    legend.dy = 8
    legend.fontName = "Helvetica"
    legend.fontSize = 8
    legend.boxAnchor = "nw"
    legend.columnMaximum = 1
    legend.strokeWidth = 0
    legend.strokeColor = colors.white
    legend.deltax = 75
    legend.deltay = 10
    legend.autoXPadding = 5
    legend.colorNamePairs = [(colors.blue, "Receitas")]
    drawing.add(legend)

    drawing.drawOn(c, x, y - 100)
    return y - 110


def generate_pdf(filename):
    c = canvas.Canvas(filename, pagesize=A4)
    width, height = A4

    for page_num in range(1, 11):
        c.setFont("Helvetica-Bold", 14)
        c.drawString(40, height - 50, f"Documento Contábil - Página {page_num}")

        # Texto
        c.setFont("Helvetica", 10)
        y_pos = height - 80
        # Sempre desenhar 3 frases modelo diferentes por página
        frases = random.sample(FRASES_MODELO, 3)
        for frase in frases:
            y_pos = draw_text(c, 40, y_pos, frase)

        # Tabela de lançamentos
        tabela_data = [
            ["Descrição", "Quantidade", "Valor Unitário (R$)", "Total (R$)"],
        ]
        for _ in range(5):
            desc = random.choice(
                [
                    "Serviços de consultoria",
                    "Materiais de escritório",
                    "Despesas com transporte",
                    "Honorários advocatícios",
                    "Aquisição de software",
                    "Manutenção de equipamentos",
                ]
            )
            qtd = random.randint(1, 20)
            valor_unit = round(random.uniform(50, 1500), 2)
            total = round(qtd * valor_unit, 2)
            tabela_data.append([desc, str(qtd), f"{valor_unit:,.2f}", f"{total:,.2f}"])

        y_pos = draw_table(c, 40, y_pos, tabela_data, [200, 70, 120, 120])

        # Gráfico de barras (a partir da página 3)
        if page_num >= 3:
            y_pos = draw_bar_chart(c, 350, height - 150)

        c.showPage()
    c.save()


def main():
    os.makedirs("pdfs", exist_ok=True)
    for i in range(1, 6):
        filename = f"pdfs/documento_contabil_{i}.pdf"
        print(f"Gerando {filename} ...")
        generate_pdf(filename)
    print("Todos os PDFs foram gerados com sucesso!")


if __name__ == "__main__":
    main()
