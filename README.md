# Relatório --- Dados Governamentais do Brasil

------------------------------------------------------------------------

# 1. Objetivo

Este relatório documenta exclusivamente o ecossistema de dados
governamentais brasileiros, incluindo:

-   Bases oficiais disponíveis
-   Plataformas que centralizam esses dados
-   Problemas e dores enfrentados por pesquisadores e desenvolvedores
-   Estimativas de volume de dados gerados

Este relatório NÃO inclui dados globais ou empresas internacionais fora
do contexto brasileiro.

------------------------------------------------------------------------

# 2. Principais Bases Oficiais de Dados do Governo Brasileiro

## 2.1 Portal Brasileiro de Dados Abertos

Descrição: Portal central de datasets públicos do governo federal.

Conteúdo:

-   Economia
-   Educação
-   Saúde
-   Transporte
-   Programas sociais
-   Indicadores sociais
-   Administração pública

Formato:

-   CSV
-   JSON
-   XML
-   APIs REST

Link: https://dados.gov.br

Estimativa de volume:

-   50--200 GB adicionados por ano

------------------------------------------------------------------------

## 2.2 Portal da Transparência

Descrição: Principal fonte de dados financeiros do governo federal.

Conteúdo:

-   Despesas públicas
-   Receitas
-   Convênios
-   Licitações
-   Contratos
-   Transferências
-   Benefícios sociais
-   Pagamentos a fornecedores

Link: https://portaldatransparencia.gov.br

Estimativa de volume:

-   20--50 milhões de registros por ano
-   10--30 GB por ano

------------------------------------------------------------------------

## 2.3 Tesouro Transparente

Descrição: Dados fiscais e orçamentários.

Conteúdo:

-   Orçamento federal
-   Execução orçamentária
-   Dívida pública
-   Receitas e despesas

Link: https://www.tesourotransparente.gov.br

Estimativa:

-   5--20 GB por ano

------------------------------------------------------------------------

## 2.4 IBGE --- extraction de dados estatísticos

Descrição: Principal fonte de dados estatísticos do Brasil.

Conteúdo:

-   Demografia
-   Economia
-   Censo
-   Indicadores sociais

Link: https://dados.ibge.gov.br

Estimativa:

-   10--50 GB por ano
-   Censo completo pode chegar a vários TB

------------------------------------------------------------------------

## 2.5 Banco Central do Brasil --- dados abertos

Descrição: Dados financeiros e monetários.

Conteúdo:

-   Taxa Selic
-   Inflação
-   Sistema bancário
-   Câmbio

Link: https://dadosabertos.bcb.gov.br

Estimativa:

-   5--20 GB por ano

------------------------------------------------------------------------

## 2.6 Câmara dos Deputados --- dados abertos

Descrição: Dados legislativos e parlamentares.

Conteúdo:

-   Deputados
-   Despesas parlamentares
-   Projetos de lei
-   Votações

Link: https://dadosabertos.camara.leg.br

Estimativa:

-   5--15 GB por ano

------------------------------------------------------------------------

## 2.7 Senado Federal --- dados abertos

Descrição: Dados legislativos do Senado.

Conteúdo:

-   Projetos de lei
-   Senadores
-   Despesas
-   Votações

Link: https://dadosabertos.senado.leg.br

Estimativa:

-   5--15 GB por ano

------------------------------------------------------------------------

# 3. Outras Fontes Relevantes

## Sistema de Saúde --- SUS

Conteúdo:

-   Internações
-   Procedimentos
-   Hospitais

Estimativa:

-   50--200 GB por ano

------------------------------------------------------------------------

## Diários Oficiais

Conteúdo:

-   Atos administrativos
-   Nomeações
-   Contratos
-   Licitações

Estimativa:

-   1--3 TB por ano

Formato comum:

-   PDF
-   Texto estruturado

------------------------------------------------------------------------

# 4. Plataformas Brasileiras que Centralizam e Estruturam Dados

## Brasil.IO

Descrição:

-   Plataforma independente
-   Centraliza e estrutura dados públicos brasileiros

Funções:

-   APIs estruturadas
-   Dados limpos
-   Histórico versionado

Link: https://brasil.io

------------------------------------------------------------------------

## Operação Serenata de Amor

Descrição:

Projeto que usa inteligência artificial para analisar gastos
parlamentares.

Funções:

-   Detectar gastos suspeitos
-   Estruturar dados da Câmara

Link: https://serenata.ai

------------------------------------------------------------------------

## Querido Diário

Descrição:

Centraliza diários oficiais brasileiros.

Funções:

-   Coleta automática
-   Estrutura dados
-   Indexação

Link: https://queridodiario.ok.org.br

------------------------------------------------------------------------

# 5. Estimativa de Massa de Dados Governamentais Brasileiros

## Dados abertos públicos

Estimativa:

-   1 TB a 4 TB por ano

Inclui:

-   transparência
-   legislativo
-   estatísticas
-   saúde
-   programas sociais

------------------------------------------------------------------------

## Dados governamentais completos (incluindo internos)

Estimativa:

-   50 TB a 500 TB por ano

Inclui:

-   logs operacionais
-   sistemas administrativos
-   sistemas fiscais completos

------------------------------------------------------------------------

## Número estimado de registros

Estimativa:

-   300 milhões a 1 bilhão de registros por ano

------------------------------------------------------------------------

# 6. Principais Problemas e Dores

## Fragmentação

Dados distribuídos entre vários portais.

Problema:

Não existe integração completa.

Impacto:

Necessário construir pipelines próprios.

------------------------------------------------------------------------

## Falta de padronização

Problemas:

-   nomes inconsistentes
-   formatos diferentes
-   schemas diferentes

Impacto:

Necessário normalização.

------------------------------------------------------------------------

## Qualidade inconsistente

Problemas:

-   duplicatas
-   dados incompletos
-   erros tipográficos

Impacto:

Dificulta análise.

------------------------------------------------------------------------

## Documentação limitada

Problema:

Campos não documentados.

Impacto:

Alto custo de entendimento.

------------------------------------------------------------------------

## Dados em formatos difíceis

Problemas:

-   PDF
-   Excel inconsistente

Impacto:

Necessário parsing complexo.

------------------------------------------------------------------------

## Volume elevado

Problema:

Grande quantidade de dados.

Impacto:

Necessário:

-   ETL pipelines
-   bancos de dados robustos

------------------------------------------------------------------------

## Atualizações constantes

Problema:

Mudanças frequentes.

Impacto:

Necessário sincronização contínua.

------------------------------------------------------------------------

# 7. Arquitetura típica de consumo

Pipeline comum:

Portal governamental ↓ Download ↓ ETL ↓ Banco estruturado ↓ API interna
↓ Análise

Tecnologias comuns:

-   Python
-   PostgreSQL
-   BigQuery
-   ElasticSearch

------------------------------------------------------------------------

# 8. Conclusão

O governo brasileiro é uma das maiores fontes de dados estruturados do
país.

Volume estimado:

-   1--4 TB por ano (dados públicos)
-   até 500 TB por ano (total interno)

Principais desafios:

-   fragmentação
-   padronização
-   qualidade
-   integração

Isso criou um ecossistema de plataformas que estruturam e facilitam o
uso desses dados.
