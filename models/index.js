const User=require('./User');
const BlogPost=require('./blogPost');
const Comment=require('./Comment');


User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

module.exports= {User, BlogPost, Comment};