[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/minorisatooo/PMHub_functions)

上記のCodespacesで開発を行う
//デプロイ
supabase functions deploy get_contents --no-verify-jwt
//コンテンツ一覧APIを叩く場合
curl "https://blxnjvqjqbimgcdeptbr.functions.supabase.co/get_contents"