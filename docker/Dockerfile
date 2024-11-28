# 第一階段：依賴安裝
FROM node:20-alpine AS dependencies

# 安裝 pnpm
RUN npm install -g pnpm

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 pnpm-lock.yaml
COPY ./apps/bootstrap/package.json ./apps/bootstrap/pnpm-lock.yaml ./

# 安裝依賴
RUN pnpm install --frozen-lockfile

# 第二階段：建置
FROM node:20-alpine AS builder

# 安裝 pnpm
RUN npm install -g pnpm

WORKDIR /app

# 複製依賴和源代碼
COPY --from=dependencies /app/node_modules ./node_modules
COPY ./apps/bootstrap ./

# 建置專案
RUN pnpm build

# 第三階段：運行
FROM node:20-alpine AS runner

# 安裝 pnpm
RUN npm install -g pnpm

WORKDIR /app

# 設定環境變量
ENV NODE_ENV production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# 複製必要的檔案
COPY --from=builder /app/.output ./

# 暴露端口
EXPOSE 3000

# 啟動命令
CMD ["node", "/app/server/index.mjs"]