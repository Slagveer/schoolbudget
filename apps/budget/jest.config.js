module.exports = {
  name: 'budget',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/budget',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
