const {Model, DataTypes}=require ('sequelize');
const sequelize= require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        commentText: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'User',
                key: 'id'
            }
        },
        post_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'BlogPost',
                key:'id'
            }
        },
        date_created:{
            type: DataTypes.DATE,
            allowNull:false,
            defaultValue:DataTypes.NOW
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored:true,
        modelName:'Comment'
    }
);

module.exports= Comment;