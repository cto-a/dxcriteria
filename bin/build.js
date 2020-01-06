var fs = require('fs');

var THEMA_MAP = {
	team: 'チーム',
	system: 'システム',
	data: 'データ駆動',
	design: 'デザイン思考',
	corporate: 'コーポレート'
};

/*

*/
var checkList = require('../checklist.json');

var summary = [ '# Summary', String(fs.readFileSync('./src/index.md')) ];

Object.keys(checkList).forEach((themeKey) => {
	var themeList = checkList[themeKey];
	var themeJa = THEMA_MAP[themeKey];
	summary.push(`+ [${themeJa}の評価項目](./${themeKey}.md)`);

	themeList.forEach((e) => {
		var md = `
# [${themeJa} 0${e.id}] ${e.type} 

## なぜ、重要か。
${e.desc}

## チェックリスト 

### メトリクスの計測
+ ${e.metrics}

### 学習と改善
+ ${e.learning}

### プラクティスと習慣
+ ${e.practice1}
+ ${e.practice2}
+ ${e.practice3}

### アンチパターン
+ ${e.antipattern1}
+ ${e.antipattern2}
+ ${e.antipattern3}
            `;
		summary.push(`  + [${e.type}](./${e.theme}_${e.id}.md)`);
		fs.writeFileSync(`./src/${e.theme}_${e.id}.md`, md);
		console.log(`Creating ${e.theme}_${e.id}.md`);
	});
	summary.push('');
});
console.log('Creating SUMMARY.md');
fs.writeFileSync('./src/SUMMARY.md', summary.join('\n'));
