json.id      @message.id
json.created_at @message.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.content @message.content
json.user_name @message.user.name
json.image @message.image_url
