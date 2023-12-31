const User=require('./User');
const BlogPost=require('./blogPost');
const Comment=require('./Comment');


User.hasMany(BlogPost, {
    foreignKey: 'user_id',
});

BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports= {User, BlogPost, Comment};