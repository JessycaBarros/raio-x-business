# Notion Integration Notes

## MCP Tools Available
- `notion-create-database`: Creates DB using SQL DDL syntax
- `notion-create-pages`: Creates pages with Notion-flavored Markdown content
- `notion-search`: Search workspace
- `notion-fetch`: Get page/database details

## Key Rules for Notion Markdown
- Tables use `<table>` XML format (NOT markdown pipes, NOT HTML thead/tbody/th)
- Each `<tr>` and `<td>` on its own line
- NO bold/italic inside `<td>` cells (plain text only)
- Use `<details><summary>` for toggles
- Use `<callout icon="emoji">` for callouts
- Headings: # ## ### ####
- Colors: `{color="Color"}` attribute
- Available colors: gray, brown, orange, yellow, green, blue, purple, pink, red + _bg variants

## Database Schema for Leads
```sql
CREATE TABLE (
  "Nome" TITLE,
  "Email" EMAIL,
  "Telefone" PHONE_NUMBER,
  "Perfil" SELECT('Visibilidade':yellow, 'Autoridade':purple, 'Conteudo sem Venda':orange, 'Funil':blue, 'Trafego Organico':green, 'Anuncio Ineficiente':red, 'Estrutura':pink),
  "Data" CREATED_TIME
)
```

## 7 Profiles for Templates
1. visibilidade - "Você Precisa de Visibilidade"
2. autoridade - "Você Tem Visibilidade, Mas Não Gera Autoridade"
3. conteudo_sem_venda - "Seu Conteúdo Não Leva à Venda"
4. funil - "Você Precisa de um Funil"
5. trafego_organico - "Você Precisa Começar a Anunciar"
6. anuncio_ineficiente - "O Problema Não É o Anúncio"
7. estrutura - "Você Precisa de Estrutura"

## Template Structure (each 5-7 pages equivalent)
- Diagnóstico (what the problem is)
- Objetivo dos próximos 15 dias
- Cronograma dia a dia (Dia 1 a Dia 15)
- Checklist de implementação

## Notion Template URLs Pattern
After creating pages, they need to be shared publicly with "Allow duplicate" enabled.
The URL format is: https://www.notion.so/page-title-{page_id}
