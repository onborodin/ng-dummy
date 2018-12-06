module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: "> 0.25%, not dead, firefox >= 58, ie >= 11"
            }
        ]
    ]
    //plugins: [ 
    //    "@babel/plugin-transform-classes",
    //    "@babel/plugin-transform-modules-commonjs"
    //]
}
