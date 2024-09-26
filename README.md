
![image](https://github.com/Money-Juicer/VTunes/assets/81414880/6566f9dd-551a-41f5-931f-9016b766b087)  
---  
### documents  
[SE-team-project](./documents/SE-team-project.pdf)  
[p1-project-proposal](./documents/p1-project-proposal.docx)  
[p2-SRS](./documents/p2-SRS.pdf)  
[p3-SDD](./documents/p3-SDD.pdf)  
[p4-test-plan-document](./documents/p4-test-plan-document.pdf)  
[p5-VTunes](./documents/p5-VTunes.pptx)


---
# 🎵 Vtunes 프로젝트  
🖥️ Electron.js를 활용한 크로스 플랫폼 데스크톱 음악 플레이어 개발 프로젝트입니다.

### **🚀 프로젝트 개요**

- 🏁 Windows와 Linux 환경에서 실행 가능한 음악 플레이어 애플리케이션 개발
- 👨‍💻 주요 역할: UI 개발, 파일 시스템 통합, 프로젝트 문서화 (SRS/SDD)
- 🛠️ 사용 기술: Electron.js, React, Node.js

### **🏆 주요 성과**

- 🌐 다양한 운영 체제 호환성 확보 (Windows, Linux)
- 🧪 Jest와 Cypress를 활용한 테스트 자동화 구현 (라인 커버리지 62.35%, 브랜치 커버리지 57.2%)
- ⏱️ 3주 개발 기간 내 프로젝트 완성 및 테스트 수행, 6개 팀 중 최고 점수 획득 (50점 만점에 46점)

### **💡 핵심 기술적 도전과 해결 방안**

**1. 🏗️ 아키텍처 설계**

도전: Electron.js의 메인 프로세스와 렌더러 프로세스 간 효율적인 통신 구조 설계

해결: Layered Architecture 도입

- 🖼️ UI Layer: 렌더러 프로세스에서 사용자 인터페이스 관리
- 🎮 Controller Layer: 메인 프로세스에서 비즈니스 로직 처리 및 프로세스 간 통신 관리
- 💾 Data Layer: 메인 프로세스에서 파일 시스템 접근 및 데이터 관리

결과: 모듈화 향상, 유지보수성 개선, 효율적인 데이터 흐름 및 이벤트 처리 구현

**2. 🔄 상태 관리 최적화**

도전: React 컴포넌트 간 효율적인 상태 공유 방법 모색

해결: Redux 도입

- ⚖️ Recoil과 Redux 비교 분석 후 Redux 선택
- 🌈 Redux의 안정성과 풍부한 생태계 활용

결과: 일관된 상태 관리와 효율적인 데이터 흐름 구현

**3. 📊 데이터 저장 최적화**

도전: 플레이리스트 메타데이터 저장 방식 결정

해결: JSON 형식의 파일 저장 방식 채택

- ⏳ 개발 기간 및 유지보수성을 고려한 선택

결과: 코드 간결성 향상 및 효율적인 데이터 관리 구현

**4. 🧪 테스트 자동화**

도전: 제한된 기간 내 효과적인 테스트 전략 수립

해결: Jest와 Cypress 도입

- 🔬 단위 테스트와 E2E 테스트의 균형 잡힌 구현

결과: 목표 테스트 커버리지 달성하지는 못했지만 3주라는 개발 기한 안에 완성 및 테스팅까지 완료한 유일한 조


![image](https://github.com/Money-Juicer/VTunes/assets/81414880/e0f3d185-58a4-4f28-8f8b-f8ea9b95a62f)

