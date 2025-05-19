server:
	node crm-backend/index.js
start: 
	node crm-backend/index.js &
	npm start &
fix: 
	npm run build
	npm start &