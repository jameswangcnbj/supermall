<template>
  <div class="wrapper">
    <ul class="content">
      <li>分类别表1</li>
      <li>分类别表2</li>
      <li>分类别表3</li>
      <li>分类别表4</li>
      <li>分类别表5</li>
      <li>分类别表6</li>
      <li>分类别表7</li>
      <li>分类别表8</li>
      <li>分类别表9</li>
      <li>分类别表10</li>
      <li>分类别表11</li>
      <li>分类别表12</li>
      <li>分类别表13</li>
      <li>分类别表14</li>
      <li>分类别表15</li>
      <li>分类别表16</li>
      <li>分类别表17</li>
      <li>分类别表18</li>
      <li>分类别表19</li>
      <li>分类别表20</li>
      <li>分类别表21</li>
      <li>分类别表22</li>
      <li>分类别表23</li>
      <li>分类别表24</li>
      <li>分类别表25</li>
      <li>分类别表26</li>
      <li>分类别表27</li>
      <li>分类别表28</li>
      <li>分类别表29</li>
      <li>分类别表30</li>
      <li>分类别表31</li>
      <li>分类别表32</li>
      <li>分类别表33</li>
      <li>分类别表34</li>
      <li>分类别表35</li>
      <li>分类别表36</li>
      <li>分类别表37</li>
      <li>分类别表38</li>
      <li>分类别表39</li>
      <li>分类别表40</li>
      <li>分类别表41</li>
      <li>分类别表42</li>
      <li>分类别表43</li>
      <li>分类别表44</li>
      <li>分类别表45</li>
      <li>分类别表46</li>
      <li>分类别表47</li>
      <li>分类别表48</li>
      <li>分类别表49</li>
      <li>分类别表50</li>
      <li>分类别表51</li>
      <li>分类别表52</li>
      <li>分类别表53</li>
      <li>分类别表54</li>
      <li>分类别表55</li>
      <li>分类别表56</li>
      <li>分类别表57</li>
      <li>分类别表58</li>
      <li>分类别表59</li>
      <li>分类别表60</li>
      <li>分类别表61</li>
      <li>分类别表62</li>
      <li>分类别表63</li>
      <li>分类别表64</li>
      <li>分类别表65</li>
      <li>分类别表66</li>
      <li>分类别表67</li>
      <li>分类别表68</li>
      <li>分类别表69</li>
      <li>分类别表70</li>
      <li>分类别表71</li>
      <li>分类别表72</li>
      <li>分类别表73</li>
      <li>分类别表74</li>
      <li>分类别表75</li>
      <li>分类别表76</li>
      <li>分类别表77</li>
      <li>分类别表78</li>
      <li>分类别表79</li>
      <li>分类别表80</li>
      <li>分类别表81</li>
      <li>分类别表82</li>
      <li>分类别表83</li>
      <li>分类别表84</li>
      <li>分类别表85</li>
      <li>分类别表86</li>
      <li>分类别表87</li>
      <li>分类别表88</li>
      <li>分类别表89</li>
      <li>分类别表90</li>
      <li>分类别表91</li>
      <li>分类别表92</li>
      <li>分类别表93</li>
      <li>分类别表94</li>
      <li>分类别表95</li>
      <li>分类别表96</li>
      <li>分类别表97</li>
      <li>分类别表98</li>
      <li>分类别表99</li>
      <li>分类别表100</li>
    </ul>
  </div>

</template>

<script>
  import BScroll from '@better-scroll/core'
  export default {
    name: "Category",
    data(){
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll('.wrapper', {
        movable: true,
        zoom: true
      })
    }
  }
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background-color: #ff8198;
    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
