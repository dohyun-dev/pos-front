/**
 * 한글 받침 여부를 확인합니다.
 */
function hasJongseong(word: string): boolean {
  if (!word) return false;
  
  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0);
  
  // 한글이 아닌 경우
  if (code < 0xac00 || code > 0xd7a3) {
    return false;
  }
  
  // 종성(받침) 계산
  return (code - 0xac00) % 28 !== 0;
}

/**
 * 단어에 맞는 조사를 선택합니다.
 * @param word 단어
 * @param josa 조사 (예: "을/를", "이/가", "은/는")
 */
export function getJosa(word: string, josa: string): string {
  const [withJongseong, withoutJongseong] = josa.split('/');
  
  if (!withJongseong || !withoutJongseong) {
    return josa;
  }
  
  return hasJongseong(word) ? withJongseong : withoutJongseong;
}

/**
 * 단어와 조사를 합칩니다.
 * @param word 단어
 * @param josa 조사 (예: "을/를", "이/가", "은/는")
 */
export function addJosa(word: string, josa: string): string {
  return word + getJosa(word, josa);
}

/**
 * 예시:
 * addJosa("사과", "을/를") => "사과를"
 * addJosa("바나나", "을/를") => "바나나를"
 * addJosa("사과", "이/가") => "사과가"
 * addJosa("바나나", "이/가") => "바나나가"
 */
