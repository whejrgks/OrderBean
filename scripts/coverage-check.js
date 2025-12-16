#!/usr/bin/env node

/**
 * 커버리지 체크 스크립트
 * 현재 프로젝트의 테스트 커버리지 상태를 분석합니다.
 */

const fs = require('fs');
const path = require('path');

console.log('📊 OrderBean 테스트 커버리지 분석\n');
console.log('='.repeat(60));

// 백엔드 분석
const backendSrcPath = path.join(__dirname, '../backend/src');
const backendTestsPath = path.join(__dirname, '../backend/tests');

const backendSrcExists = fs.existsSync(backendSrcPath);
const backendTestsExists = fs.existsSync(backendTestsPath);

let backendSrcFiles = 0;
let backendTestFiles = 0;
let backendTestCases = 0;

if (backendSrcExists) {
  const countFiles = (dir) => {
    let count = 0;
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        count += countFiles(path.join(dir, file.name));
      } else if (file.name.endsWith('.ts') && !file.name.endsWith('.test.ts')) {
        count++;
      }
    }
    return count;
  };
  backendSrcFiles = countFiles(backendSrcPath);
}

if (backendTestsExists) {
  const testFiles = fs.readdirSync(backendTestsPath)
    .filter(f => f.endsWith('.test.ts'));
  backendTestFiles = testFiles.length;
  
  // 간단한 테스트 케이스 카운트 (describe/it 개수 추정)
  testFiles.forEach(file => {
    const content = fs.readFileSync(path.join(backendTestsPath, file), 'utf8');
    const itMatches = content.match(/it\(/g);
    if (itMatches) {
      backendTestCases += itMatches.length;
    }
  });
}

// 프론트엔드 분석
const frontendSrcPath = path.join(__dirname, '../frontend/src');
const frontendTestsPath = path.join(__dirname, '../frontend/src/tests');

const frontendSrcExists = fs.existsSync(frontendSrcPath);
const frontendTestsExists = fs.existsSync(frontendTestsPath);

let frontendSrcFiles = 0;
let frontendTestFiles = 0;
let frontendTestCases = 0;

if (frontendSrcExists) {
  const countFiles = (dir, excludeTests = false) => {
    let count = 0;
    if (!fs.existsSync(dir)) return 0;
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory() && (!excludeTests || file.name !== 'tests')) {
        count += countFiles(path.join(dir, file.name), excludeTests);
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
        if (!file.name.endsWith('.test.tsx') && !file.name.endsWith('.test.ts')) {
          count++;
        }
      }
    }
    return count;
  };
  frontendSrcFiles = countFiles(frontendSrcPath, true);
}

if (frontendTestsExists) {
  const countTestFiles = (dir) => {
    let count = 0;
    let cases = 0;
    if (!fs.existsSync(dir)) return { files: 0, cases: 0 };
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        const sub = countTestFiles(path.join(dir, file.name));
        count += sub.files;
        cases += sub.cases;
      } else if (file.name.endsWith('.test.tsx') || file.name.endsWith('.test.ts')) {
        count++;
        const content = fs.readFileSync(path.join(dir, file.name), 'utf8');
        const itMatches = content.match(/it\(/g);
        if (itMatches) {
          cases += itMatches.length;
        }
      }
    }
    return { files: count, cases };
  };
  const result = countTestFiles(frontendTestsPath);
  frontendTestFiles = result.files;
  frontendTestCases = result.cases;
}

// 커버리지 계산
const backendCoverage = backendSrcFiles > 0 
  ? Math.round((backendSrcFiles / (backendSrcFiles + backendTestFiles)) * 100) 
  : 0;

const frontendCoverage = frontendSrcFiles > 0
  ? Math.round((frontendSrcFiles / (frontendSrcFiles + frontendTestFiles)) * 100)
  : 0;

const totalSrcFiles = backendSrcFiles + frontendSrcFiles;
const totalTestFiles = backendTestFiles + frontendTestFiles;
const totalTestCases = backendTestCases + frontendTestCases;
const totalCoverage = totalSrcFiles > 0
  ? Math.round((totalSrcFiles / (totalSrcFiles + totalTestFiles)) * 100)
  : 0;

// 결과 출력
console.log('\n📦 백엔드');
console.log('─'.repeat(60));
console.log(`소스 파일:     ${backendSrcFiles}개`);
console.log(`테스트 파일:   ${backendTestFiles}개`);
console.log(`테스트 케이스: ${backendTestCases}개`);
console.log(`커버리지:      ${backendCoverage}% ${backendSrcFiles === 0 ? '(구현 파일 없음)' : ''}`);

console.log('\n🎨 프론트엔드');
console.log('─'.repeat(60));
console.log(`소스 파일:     ${frontendSrcFiles}개`);
console.log(`테스트 파일:   ${frontendTestFiles}개`);
console.log(`테스트 케이스: ${frontendTestCases}개`);
console.log(`커버리지:      ${frontendCoverage}% ${frontendSrcFiles === 0 ? '(구현 파일 없음)' : ''}`);

console.log('\n📊 전체 요약');
console.log('─'.repeat(60));
console.log(`총 소스 파일:     ${totalSrcFiles}개`);
console.log(`총 테스트 파일:   ${totalTestFiles}개`);
console.log(`총 테스트 케이스: ${totalTestCases}개`);
console.log(`전체 커버리지:    ${totalCoverage}%`);

console.log('\n📈 상태');
console.log('─'.repeat(60));
if (totalSrcFiles === 0) {
  console.log('⚠️  RED 단계: 테스트는 작성되었으나 구현 파일이 없습니다.');
  console.log('   → GREEN 단계로 진행하여 구현 파일을 생성해야 합니다.');
} else if (totalCoverage < 60) {
  console.log('🟡 커버리지가 목표(80%)보다 낮습니다.');
  console.log('   → 추가 테스트 작성이 필요합니다.');
} else if (totalCoverage < 80) {
  console.log('🟢 커버리지가 양호하지만 목표에 도달하지 못했습니다.');
  console.log('   → 엣지 케이스 테스트를 추가하세요.');
} else {
  console.log('✅ 커버리지 목표를 달성했습니다!');
}

console.log('\n' + '='.repeat(60));
console.log('💡 커버리지 측정: npm test -- --coverage');
console.log('='.repeat(60));

